// 타이머
export function calcMin(time: number) {
	return Math.floor(time / 60);
}

export function calcSec(time: number) {
	const sec = time % 60;

	return sec < 10 ? '0' + sec : sec;
}

// 숫자
export function createRandomNumber(min: number, max: number) {
	if (min >= 0) return Math.floor(Math.random() * (max + 1 - min) + min);
	else return Math.floor(Math.random() * (-min + max + 1) + min);
}
