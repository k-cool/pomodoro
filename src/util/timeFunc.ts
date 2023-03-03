export function calcMin(time: number) {
	return Math.floor(time / 60);
}

export function calcSec(time: number) {
	const sec = time % 60;

	return sec < 10 ? '0' + sec : sec;
}
