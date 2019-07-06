import {rollup} from "rollup";
import brfs from "../src/index";
import fs from "fs";
import path from "path";
import assert from "assert";

const fixturesDir = path.join(__dirname, "snapshots");

describe("rollup-plugin-brfs", () => {
    fs.readdirSync(fixturesDir)
        .map((caseName: string) => {
            const normalizedTestName = caseName.replace(/-/g, " ");
            it(`Test ${normalizedTestName}`, async function () {
                const fixtureDir = path.join(fixturesDir, caseName);
                const actualFilePath = path.join(fixtureDir, "input.js");
                const actual = await rollup({
                    input: actualFilePath,
                    plugins: [brfs()]
                }).then(bundle => bundle.generate({
                    format: 'cjs'
                }));
                const actualOutput: string = actual.output[0].code
                const expectedFilePath = path.join(fixtureDir, "output.js");
                // Usage: update snapshots
                // UPDATE_SNAPSHOT=1 npm test
                if (!fs.existsSync(expectedFilePath) || process.env.UPDATE_SNAPSHOT) {
                    fs.writeFileSync(expectedFilePath, actualOutput);
                    this.skip(); // skip when updating snapshots
                    return;
                }
                // compare input and output
                const expected = fs.readFileSync(expectedFilePath, "utf-8");
                assert.strictEqual(
                    actualOutput,
                    expected
                );
            });
        });
});
