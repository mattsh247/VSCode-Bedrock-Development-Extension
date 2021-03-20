/*BSD 3-Clause License

Copyright (c) 2020, Blockception Ltd
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
   contributors may be used to endorse or promote products derived from
   this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.*/
import { LocationWord } from "bc-vscode-words";
import { TextDocument } from "vscode-languageserver-textdocument";
import { Database } from "../Database/Database";
import { DiagnosticsBuilder } from "../Diagnostics/Builder";
import { molang } from "../include";
import { ProcessWord } from "../Types/Commands/include";
import { DiagnoseLine } from "../Types/Minecraft/Behavior/Functions/include";
import { DetectGeneralDataType, GeneralDataType } from "../Types/Minecraft/Format/include";
import { behavior, resource } from "../Types/Minecraft/include";
import { GetValidationData, ValidationData } from "../Validation/include";

export function ProcessJson(doc: TextDocument): void {
  Database.Data.DeleteFile(doc.uri);
  let Type = DetectGeneralDataType(doc.uri);

  switch (Type) {
    case GeneralDataType.unknown:
      return;

    case GeneralDataType.behaviour_pack:
      behavior.Process(doc);
      break;

    case GeneralDataType.resource_pack:
      resource.Process(doc);
      break;
  }

  let Data = molang.files.DataCollector.Parse(doc);

  if (Data.Command.length > 0) {
    let Builder = new DiagnosticsBuilder(doc);
    Data.Command.forEach((w) => ProcessJsonCommand(w, doc, Builder));
    //Builder.SendDiagnostics();
  }
}

function ProcessJsonCommand(word: LocationWord, doc: TextDocument, Builder: DiagnosticsBuilder) {
  //Process contents
  ProcessWord(word, doc);
  /*
  let start = word.location.range.start;

  let Data = Database.MinecraftProgramData.GetProjecData();
  let validation: ValidationData | undefined;

  if (Data) {
    validation = GetValidationData(Data.Workspaces);
  } else {
    validation = ValidationData.createEmpty();
  }

  DiagnoseLine(word.text, start, start, validation, Builder);*/
}