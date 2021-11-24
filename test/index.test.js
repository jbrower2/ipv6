const { toSegments, toString } = require("../dist");

// toSegments

test('toSegments("::")', () => {
	expect(toSegments("::")).toBe([0, 0, 0, 0, 0, 0, 0, 0]);
});

test('toSegments("0000:0000:0000:0000:0000:0000:0000:0000")', () => {
	expect(toSegments("0000:0000:0000:0000:0000:0000:0000:0000")).toBe([
		0, 0, 0, 0, 0, 0, 0, 0,
	]);
});

test('toSegments("0001::0002")', () => {
	expect(toSegments("0001::0002")).toBe([1, 0, 0, 0, 0, 0, 0, 2]);
});

test('toSegments("0001:0000:0000:0000:0000:0000:0000:0002")', () => {
	expect(toSegments("0001:0000:0000:0000:0000:0000:0000:0002")).toBe([
		1, 0, 0, 0, 0, 0, 0, 2,
	]);
});

test('toSegments("0001:0002:0003:0004:0005:0006:0007:0008")', () => {
	expect(toSegments("0001:0002:0003:0004:0005:0006:0007:0008")).toBe([
		1, 2, 3, 4, 5, 6, 7, 8,
	]);
});

test('toSegments("1:2:3:4:5:6:7:8")', () => {
	expect(toSegments("1:2:3:4:5:6:7:8")).toBe([1, 2, 3, 4, 5, 6, 7, 8]);
});

test('toSegments("2601:0600:897f:e4a9:1cb3:5011:0cfe:45c4")', () => {
	expect(toSegments("2601:0600:897f:e4a9:1cb3:5011:0cfe:45c4")).toBe([
		9729, 1536, 35199, 58537, 7347, 20497, 3326, 17860,
	]);
});

test('toSegments("2601::1:45c4")', () => {
	expect(toSegments("2601::1:45c4")).toBe([9729, 0, 0, 0, 0, 0, 1, 17860]);
});

// toString

test("toString([0, 0, 0, 0, 0, 0, 0, 0])", () => {
	expect(toString([0, 0, 0, 0, 0, 0, 0, 0])).toBe("::");
});

test("toString([1, 0, 0, 0, 0, 0, 0, 2])", () => {
	expect(toString([1, 0, 0, 0, 0, 0, 0, 2])).toBe("1::2");
});

test("toString([1, 2, 3, 4, 5, 6, 7, 8])", () => {
	expect(toString([1, 2, 3, 4, 5, 6, 7, 8])).toBe("1:2:3:4:5:6:7:8");
});

test("toString([9729, 1, 2, 0, 4, 20497, 3326, 17860])", () => {
	expect(toString([9729, 1, 2, 0, 4, 20497, 3326, 17860])).toBe(
		"2601:1:2:0:4:5011:cfe:45c4"
	);
});

test("toString([9729, 0, 0, 0, 0, 20497, 3326, 17860])", () => {
	expect(toString([9729, 0, 0, 0, 0, 20497, 3326, 17860])).toBe(
		"2601::5011:cfe:45c4"
	);
});

test("toString([0, 0, 0, 0, 3, 0, 0, 0])", () => {
	expect(toString([0, 0, 0, 0, 3, 0, 0, 0])).toBe("::3:0:0:0");
});
