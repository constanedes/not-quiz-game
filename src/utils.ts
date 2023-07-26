import { setTimeout } from "timers/promises";
import { logger } from "./helpers/logger.js";
import { type PackageJson } from "type-fest";
import path from "node:path";
import fs from "node:fs";
import { PKG_ROOT } from "./consts.js";

/**
 * Sleep X miliseconds
 * @param time miliseconds to sleep
 */
export async function sleep(time: number): Promise<void> {
    await setTimeout(time);
}

/**
 * Detect is the app is running under debug mode
 * @returns boolean
 */
export function isDebugging(): boolean {
    return process.env.NODE_ENV !== "production";
}

/**
 * Gets random number (limits included)
 */
export function getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Removes template string indentation.
 */
export default function dedent(
    callSite: TemplateStringsArray,
    ...args: unknown[]
): string | ((...args: unknown[]) => string) {
    function format(str: string): string {
        let size = -1;
        return str.replace(/\n(\s+)/g, (m: string, m1: string) => {
            if (size < 0) size = m1.replace(/\t/g, "    ").length;
            return "\n" + m1.slice(Math.min(m1.length, size));
        });
    }
    if (typeof callSite === "string") return format(callSite);
    const output = callSite
        .slice(0, args.length + 1)
        .map((text: string, i: number) => (i === 0 ? "" : args[i - 1]) + text)
        .join("");

    return format(output);
}

/**
 * Fetchs data from API.
 * @param path The page/server URL.
 * @param query Object for build the query string.
 * @param options Request options.
 */
export async function getApiData(path: string, query?: { [key: string]: string | number }, options: RequestInit = {}) {
    try {
        let queryString = "";
        if (query) {
            const params = new URLSearchParams();
            Object.entries(query).forEach(([key, value]) => params.append(key, String(value)));
            queryString = `?${params.toString()}`;
        }

        const response = await fetch(`${path}${queryString}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
            },
            ...options,
        });

        if (!response.ok) throw new Error("Request response was not ok");
        return await response.json();
    } catch (error) {
        logger.error("Cannot obtain API data", error);
    }
}
/**
 * Gets the version from package.json
 */
export function getVersion(): string {
    const packageJsonPath = path.join(PKG_ROOT, "package.json");
    const packageJsonContent = JSON.parse(fs.readFileSync(packageJsonPath).toString()) as PackageJson;
    return packageJsonContent.version ?? "1.0.0";
}
