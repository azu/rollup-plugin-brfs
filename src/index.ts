import { Plugin } from "rollup";
import * as path from "path";
import { Readable } from "stream";

const brfs = require("brfs");
const EXTENSIONS = [".js", ".jsx", ".ts", ".tsx"];
export type rollupBrfsOptions = {
    // Default:  [".js", ".jsx", ".ts", ".tsx"]
    extensions?: string[];
    // https://github.com/browserify/brfs#var-tr--brfsfile-opts
    brfsOptions?: {};
};
const rollupBrfs = function rollUpBrfs(options: rollupBrfsOptions = {}): Plugin {
    return {
        name: "brfs",
        transform(code: string, id: string) {
            const ext = path.extname(id);
            if (!EXTENSIONS.includes(ext)) {
                return null;
            }
            return new Promise((resolve, reject) => {
                let output: string = "";
                const src = new Readable();
                src.push(code);
                src.push(null);
                const stream = src.pipe(brfs(id, options));
                stream.on("data", function(data: string) {
                    output += data.toString();
                });
                stream.on("end", function() {
                    resolve({
                        code: output,
                        map: { mappings: "" }
                    });
                });
                stream.on("error", function(error: Error) {
                    reject(error);
                });
            });
        }
    };
};
export default rollupBrfs;
