import { LocationWord } from "bc-vscode-words";
import { DiagnosticsBuilder } from "../../../Diagnostics/Builder";
import { DiagnoseMode } from "../../Commands/Modes/Diagnose";
import { GameMode } from "./Mode";

export function ProvideDiagnose(data: LocationWord, builder: DiagnosticsBuilder): void {
  DiagnoseMode(data, GameMode, builder);
}