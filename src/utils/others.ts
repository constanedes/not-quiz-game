import { setTimeout } from "timers/promises";

export async function sleep(time: number): Promise<void> {
    await setTimeout(time);
}

export function getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
