import { ModuleLoader } from "./module.loader";
import { FileLoader } from "./file.loader";
export interface Loader extends FileLoader, ModuleLoader {}
