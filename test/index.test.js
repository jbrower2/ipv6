const { toSegments, toString } = require("../dist");

// toSegments

test('toSegments("::")', () => {
	expect(toSegments("::")).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]);
});

test('toSegments("0000:0000:0000:0000:0000:0000:0000:0000")', () => {
	expect(toSegments("0000:0000:0000:0000:0000:0000:0000:0000")).toStrictEqual([
		0, 0, 0, 0, 0, 0, 0, 0,
	]);
});

test('toSegments("0001::0002")', () => {
	expect(toSegments("0001::0002")).toStrictEqual([1, 0, 0, 0, 0, 0, 0, 2]);
});

test('toSegments("0001:0000:0000:0000:0000:0000:0000:0002")', () => {
	expect(toSegments("0001:0000:0000:0000:0000:0000:0000:0002")).toStrictEqual([
		1, 0, 0, 0, 0, 0, 0, 2,
	]);
});

test('toSegments("0001:0002:0003:0004:0005:0006:0007:0008")', () => {
	expect(toSegments("0001:0002:0003:0004:0005:0006:0007:0008")).toStrictEqual([
		1, 2, 3, 4, 5, 6, 7, 8,
	]);
});

test('toSegments("1:2:3:4:5:6:7:8")', () => {
	expect(toSegments("1:2:3:4:5:6:7:8")).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8]);
});

test('toSegments("2601:0600:897f:e4a9:1cb3:5011:0cfe:45c4")', () => {
	expect(toSegments("2601:0600:897f:e4a9:1cb3:5011:0cfe:45c4")).toStrictEqual([
		9729, 1536, 35199, 58537, 7347, 20497, 3326, 17860,
	]);
});

test('toSegments("2601::1:45c4")', () => {
	expect(toSegments("2601::1:45c4")).toStrictEqual([
		9729, 0, 0, 0, 0, 0, 1, 17860,
	]);
});

test('toSegments("1:2:3::4:5:6")', () => {
	expect(toSegments("1:2:3::4:5:6")).toStrictEqual([1, 2, 3, 0, 0, 4, 5, 6]);
});

test('toSegments("1:23:456:7890::")', () => {
	expect(toSegments("1:23:456:7890::")).toStrictEqual([
		1, 35, 1110, 30864, 0, 0, 0, 0,
	]);
});

test('toSegments("::1:23:456:7890")', () => {
	expect(toSegments("::1:23:456:7890")).toStrictEqual([
		0, 0, 0, 0, 1, 35, 1110, 30864,
	]);
});

test('toSegments("1::2::3")', () => {
	expect(() => toSegments("1::2::3")).toThrow(
		/^IPv6 address should only have one zero expansion:/
	);
});

test('toSegments("")', () => {
	expect(() => toSegments("")).toThrow(
		/^IPv6 address should have eight parts:/
	);
});

test('toSegments("1")', () => {
	expect(() => toSegments("1")).toThrow(
		/^IPv6 address should have eight parts:/
	);
});

test('toSegments("1:2:3:4:5:6:7:8:9")', () => {
	expect(() => toSegments("1:2:3:4:5:6:7:8:9")).toThrow(
		/^IPv6 address should have eight parts:/
	);
});

test('toSegments("1:2:3::4:5:6:7")', () => {
	expect(() => toSegments("1:2:3::4:5:6:7")).toThrow(
		/^IPv6 address can only have zero expansion for two or more zeros:/
	);
});

test('toSegments("1:23:456::abcde")', () => {
	expect(() => toSegments("1:23:456::abcde")).toThrow(
		"IPv6 segments must be 1-4 hexadecimal digits: abcde"
	);
});

test('toSegments(":1:2:3::")', () => {
	expect(() => toSegments(":1:2:3::")).toThrow(
		"IPv6 segments must be 1-4 hexadecimal digits: "
	);
});

test('toSegments("::1:2:3:")', () => {
	expect(() => toSegments("::1:2:3:")).toThrow(
		"IPv6 segments must be 1-4 hexadecimal digits: "
	);
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

test("toString([0, 0, 0, 2, 3, 0, 0, 0])", () => {
	expect(toString([0, 0, 0, 2, 3, 0, 0, 0])).toBe("::2:3:0:0:0");
});

test("toString([0, 0, 0, 2, 0, 0, 0, 0])", () => {
	expect(toString([0, 0, 0, 2, 0, 0, 0, 0])).toBe("0:0:0:2::");
});

test("toString([])", () => {
	expect(() => toString([])).toThrow(
		/^IPv6 address should have eight parts segments:/
	);
});

test("toString([1, 2, 3, 4, 5, 6, 7, 8, 9])", () => {
	expect(() => toString([1, 2, 3, 4, 5, 6, 7, 8, 9])).toThrow(
		/^IPv6 address should have eight parts segments:/
	);
});
