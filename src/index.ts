/**
 * Converts an IPv6 address to segments.
 *
 * This method will throw an error on invalid input.
 * See [Wikipedia](https://en.wikipedia.org/wiki/IPv6_address) for more information on IPv6 address formats.
 *
 * @param address The IPv6 string.
 * @returns The expanded format of the address.
 */
export function toSegments(address: string): number[] {
	const sections = address.split("::");
	if (sections.length > 2) {
		throw new Error(
			`IPv6 address should only have one zero expansion: ${address}`
		);
	}

	/** All parts of the address, in original string form, `undefined` if an expanded zero. */
	const strings: (string | undefined)[] = [];

	if (sections.length === 1) {
		const parts = sections[0].split(":");
		if (parts.length !== 8) {
			throw new Error(`IPv6 address should have eight parts: ${address}`);
		}

		strings.push(...parts);
	} else {
		// '::' found, so we need to expand zeros

		const start = !sections[0] ? [] : sections[0].split(":");
		const end = !sections[1] ? [] : sections[1].split(":");

		// 6 because zero expansion must account for at least two slots
		if (start.length + end.length > 6) {
			throw new Error(
				`IPv6 address can only have zero expansion for two or more zeros: ${address}`
			);
		}

		// push some number of `undefined` values between the start and end arrays
		strings.push(...start, ...Array(8 - start.length - end.length), ...end);
	}

	return strings.map((s) => {
		if (!s) {
			return 0;
		}

		if (!/^[0-9a-f]{1,4}$/i.test(s)) {
			throw new Error(`IPv6 segments must be 1-4 hexadecimal digits: ${s}`);
		}

		// parse from hex
		return parseInt(s, 16);
	});
}

/**
 * Formats an IPv6 array as a minimal string.
 *
 * @param segments The IPv6 address segments.
 * @returns The minimal form of the address.
 */
export function toString(segments: number[]): string {
	console.log(segments);
	return "";
}
