describe('Complaint Category Triage Test Suite', () => {
  const triageComplaint = (text) => {
    const lower = text.toLowerCase();
    if (lower.includes('water') || lower.includes('pipe') || lower.includes('tap') || lower.includes('bathroom')) {
      return 'Plumbing';
    }
    if (lower.includes('light') || lower.includes('fan') || lower.includes('switch') || lower.includes('socket')) {
      return 'Electrical';
    }
    if (lower.includes('food') || lower.includes('mess') || lower.includes('curry') || lower.includes('meal')) {
      return 'Mess / Food';
    }
    if (lower.includes('wifi') || lower.includes('internet') || lower.includes('router') || lower.includes('network')) {
      return 'Internet / WiFi';
    }
    return 'General';
  };

  it('should categorize plumbing issues accurately', () => {
    expect(triageComplaint('The bathroom tap is leaking continuously')).toBe('Plumbing');
  });

  it('should categorize electrical issues accurately', () => {
    expect(triageComplaint('Ceiling fan in room 204 is making strange noise')).toBe('Electrical');
  });

  it('should categorize mess/food issues accurately', () => {
    expect(triageComplaint('Mess food lunch was cold today')).toBe('Mess / Food');
  });
});
