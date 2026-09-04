const Room = require('../models/Room');
const User = require('../models/User');

// @desc    Get all rooms with filter
// @route   GET /api/rooms
const getRooms = async (req, res) => {
  try {
    const { block, type, status } = req.query;
    let query = {};
    if (block) query.block = block;
    if (type) query.type = type;
    if (status) query.status = status;

    const rooms = await Room.find(query).populate('occupants', 'name email rollNo department year phone');
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single room details
// @route   GET /api/rooms/:id
const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id).populate('occupants', 'name email rollNo department year phone avatar');
    if (room) {
      res.json(room);
    } else {
      res.status(404).json({ message: 'Room not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new room (Admin)
// @route   POST /api/rooms
const createRoom = async (req, res) => {
  try {
    const { roomNumber, block, floor, type, capacity, feePerSemester, amenities } = req.body;

    const roomExists = await Room.findOne({ roomNumber });
    if (roomExists) {
      return res.status(400).json({ message: 'Room with this number already exists' });
    }

    const room = await Room.create({
      roomNumber,
      block,
      floor,
      type,
      capacity,
      feePerSemester,
      amenities,
    });

    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    SMART ROOM ALLOCATION ENGINE
// @route   POST /api/rooms/smart-allocate
// @access  Private (Student or Admin)
const smartAllocateRoom = async (req, res) => {
  try {
    const studentId = req.body.studentId || req.user._id;
    const { preferredType, preferredBlock } = req.body;

    const student = await User.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    if (student.room) {
      return res.status(400).json({ message: `Student already allocated to Room ${student.roomNumber}` });
    }

    // Determine target block based on gender or preference
    let blockQuery = {};
    if (preferredBlock) {
      blockQuery.block = preferredBlock;
    } else if (student.gender === 'Female') {
      blockQuery.block = { $regex: /Girls|Block B|Wing B/i };
    } else {
      blockQuery.block = { $regex: /Boys|Block A|Wing A/i };
    }

    let roomQuery = {
      ...blockQuery,
      $expr: { $lt: ['$occupied', '$capacity'] },
      status: 'Available',
    };

    if (preferredType) {
      roomQuery.type = preferredType;
    }

    // Fetch all prospective available rooms
    let availableRooms = await Room.find(roomQuery).populate('occupants', 'department year gender');

    if (availableRooms.length === 0) {
      // Relax room type restriction if no exact match found
      delete roomQuery.type;
      availableRooms = await Room.find(roomQuery).populate('occupants', 'department year gender');
    }

    if (availableRooms.length === 0) {
      return res.status(404).json({
        message: 'No available rooms found matching requirements. Please contact the Warden office.',
      });
    }

    // SMART SCORING ALGORITHM:
    // Score each available room based on:
    // 1. Department match with roommates (+50 pts)
    // 2. Academic Year match (+30 pts)
    // 3. Partially filled rooms to compact space utilization (+20 pts)
    let bestRoom = null;
    let highestScore = -1;
    let matchReason = '';

    for (const room of availableRooms) {
      let score = 0;
      let reasons = [];

      // Existing roommates analysis
      const sameDeptCount = room.occupants.filter((o) => o.department === student.department).length;
      const sameYearCount = room.occupants.filter((o) => o.year === student.year).length;

      if (sameDeptCount > 0) {
        score += 50 * sameDeptCount;
        reasons.push(`Department compatibility (${student.department})`);
      }

      if (sameYearCount > 0) {
        score += 30 * sameYearCount;
        reasons.push(`Academic Year synergy (${student.year})`);
      }

      // Preference for filling partially occupied rooms over empty ones
      if (room.occupied > 0 && room.occupied < room.capacity) {
        score += 20;
        reasons.push('Optimal bed occupancy');
      }

      // Base score for available bed
      score += 10;

      if (score > highestScore) {
        highestScore = score;
        bestRoom = room;
        matchReason = reasons.length > 0 ? reasons.join(', ') : 'Best available vacancy';
      }
    }

    if (!bestRoom) {
      bestRoom = availableRooms[0];
      matchReason = 'Standard room allocation';
    }

    // Allocate student to best room
    const bedIndex = bestRoom.occupied + 1;
    const bedLetter = String.fromCharCode(64 + bedIndex); // A, B, C...

    bestRoom.occupants.push(student._id);
    bestRoom.occupied += 1;
    if (bestRoom.occupied >= bestRoom.capacity) {
      bestRoom.status = 'Full';
    }
    await bestRoom.save();

    student.room = bestRoom._id;
    student.roomNumber = bestRoom.roomNumber;
    student.bedNumber = `Bed ${bedLetter}`;
    student.status = 'Active';
    await student.save();

    res.json({
      success: true,
      message: `🎉 Smart Allocated Room ${bestRoom.roomNumber} (${bestRoom.type})`,
      matchScore: highestScore,
      matchReason,
      allocatedRoom: bestRoom,
      bedNumber: student.bedNumber,
    });
  } catch (error) {
    console.error('Smart allocation error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Deallocate student from room (Admin)
// @route   POST /api/rooms/deallocate
const deallocateRoom = async (req, res) => {
  try {
    const { studentId } = req.body;
    const student = await User.findById(studentId);

    if (!student || !student.room) {
      return res.status(400).json({ message: 'Student does not have an active room allocation' });
    }

    const room = await Room.findById(student.room);
    if (room) {
      room.occupants = room.occupants.filter((id) => id.toString() !== student._id.toString());
      room.occupied = Math.max(0, room.occupied - 1);
      room.status = 'Available';
      await room.save();
    }

    student.room = null;
    student.roomNumber = 'Unassigned';
    student.bedNumber = '';
    student.status = 'Pending Room';
    await student.save();

    res.json({ message: `Student ${student.name} successfully deallocated from room` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a room (Admin)
// @route   DELETE /api/rooms/:id
const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    if (room.occupied > 0) {
      return res.status(400).json({ message: 'Cannot delete room with active occupants. Please deallocate students first.' });
    }
    await room.deleteOne();
    res.json({ message: 'Room removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getRooms,
  getRoomById,
  createRoom,
  smartAllocateRoom,
  deallocateRoom,
  deleteRoom,
};
