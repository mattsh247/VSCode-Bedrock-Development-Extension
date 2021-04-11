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
import { ExecuteCommandParams } from "vscode-languageserver";
import { Console } from "../Console/Console";
import { Commands } from "../Constants";
import { DiagnoseProjectCommand } from "./Diagnose Project";
import { McImportErrorsCommand } from "./Import Errors";
import { AddAllItems } from "./Language/AddAll";
import { Create } from "./Templates/Create";

export function OnCommandRequestAsync(params: ExecuteCommandParams): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    resolve(OnCommandRequest(params));
  });
}

function OnCommandRequest(params: ExecuteCommandParams): any {
  try {
    switch (params.command) {
      case Commands.ImportErrors:
        return McImportErrorsCommand(params);

      case Commands.DiagnoseProject:
        return DiagnoseProjectCommand(params);

      case Commands.AddLanguageFile:
        return AddAllItems(params);

      default:
        if (params.command.startsWith(Commands.Create.Base)) {
          return Create(params);
        }
    }
  } catch (error) {
    Console.Error(JSON.stringify(error));
  }

  return undefined;
}