import {Weight, Brightness} from "./Enums";
import {Stats} from "fs";
import {ReactElement} from "react";
import {Job} from "./Job";
import {Session} from "./Session";
import {Suggestion} from "./plugins/autocompletion_providers/Suggestions";
import {ScreenBuffer} from "./ScreenBuffer";

export type ColorCode = number | number[];

export interface Attributes {
    inverse?: boolean;
    color?: ColorCode;
    backgroundColor?: ColorCode;
    brightness?: Brightness;
    weight?: Weight;
    underline?: boolean;
    crossedOut?: boolean;
    blinking?: boolean;
    cursor?: boolean;
}

// FIXME: rename to contributor.
export interface AutocompletionProvider {
    forCommand?: string;
    getSuggestions(job: Job): Promise<Suggestion[]>;
}

export interface FileInfo {
    name: string;
    stat: Stats;
}

export interface OutputDecorator {
    isApplicable: (job: Job) => boolean;
    decorate: (job: Job) => ReactElement<any>;

    /**
     * @note Setting this property to `true` will result in rendering performance
     *       decrease because the output will be re-decorated after each data chunk.
     */
    shouldDecorateRunningPrograms?: boolean;
}

export interface EnvironmentObserverPlugin {
    currentWorkingDirectoryWillChange: (session: Session, directory: string) => void;
    currentWorkingDirectoryDidChange: (session: Session, directory: string) => void;
}

export interface PreexecPlugin {
    (job: Job): Promise<void>;
}

export interface TerminalLikeDevice {
    screenBuffer: ScreenBuffer;
    dimensions: Dimensions;
    write: (input: string | KeyboardEvent) => void;
}
