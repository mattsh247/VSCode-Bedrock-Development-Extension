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
import { OffsetWord } from "bc-vscode-words";
import { Range, TextDocument } from "vscode-languageserver-textdocument";
import { SemanticTokens } from "vscode-languageserver/node";
import { IsMolang } from "../Molang/Functions";
import { CreateMolangWords } from "../Molang/Words";
import { IsFloat } from "../Types/General/Float/include";
import { IsSelector } from "../Types/General/Selector/include";
import { DetectGeneralDataType, GeneralDataType } from "../Types/Minecraft/Format/include";
import { JsonSemanticTokensBuilder } from "./Builders/JsonSemanticTokensBuilder";
import { McfunctionSemanticTokensBuilder } from "./Builders/McfunctionSemanticTokensBuilder";
import { SemanticModifiersEnum, SemanticTokensEnum } from "./Legend";
import { McfunctionLineTokens } from "./Mcfunctions";

export function ProvideJsonSemanticTokens(doc: TextDocument, range?: Range | undefined): SemanticTokens {
  var Type = DetectGeneralDataType(doc.uri);

  //Not related to minecraft
  if (Type == GeneralDataType.unknown) return { data: [] };

  let Builder = new JsonSemanticTokensBuilder(doc);
  let text = doc.getText(range);
  let offset = 0;

  if (range) {
    offset = doc.offsetAt(range.start);
  } else {
    offset = 0;
  }

  CreateTokens(text, offset, Builder);

  return Builder.Build();
}

/**
 *
 * @param text
 * @param offset
 * @param Builder
 */
function CreateTokens(text: string, offset: number, Builder: JsonSemanticTokensBuilder): void {
  let index = 0;

  while (index >= 0) {
    let startindex = findNext(text, index);
    if (startindex < 0) return;

    let endindex = findNext(text, startindex + 1);
    if (endindex < 0) return;

    startindex++;
    let property = text.substring(startindex, endindex);
    index = endindex + 1;

    if (IsMolang(property)) {
      if (property.startsWith("/")) {
        property = property.substring(1);
        Builder.Add(startindex, startindex + 1, SemanticTokensEnum.operator);
        startindex++;
        McfunctionLineTokens(property, 0, offset + startindex, McfunctionSemanticTokensBuilder.FromJson(Builder));
      } else {
        let Words = CreateMolangWords(property, offset + startindex);
        ConvertWords(Words, Builder);
      }
    }
  }
}

/**
 *
 * @param Words
 * @param Builder
 */
function ConvertWords(Words: OffsetWord[], Builder: JsonSemanticTokensBuilder) {
  for (let I = 0; I < Words.length; I++) {
    let Word = Words[I];

    let text = Word.text;

    if ((text.startsWith("'") && text.endsWith("'")) || (text.startsWith('"') && text.endsWith('"'))) {
      Builder.AddWord(Word, SemanticTokensEnum.regexp, SemanticModifiersEnum.readonly);

      continue;
    }

    switch (text.toLowerCase()) {
      case "array":
      case "geometry":
      case "material":
      case "texture":
        Builder.AddWord(Word, SemanticTokensEnum.interface, SemanticModifiersEnum.readonly);
        break;

      case "math":
      case "query":
      case "variable":
        Builder.AddWord(Word, SemanticTokensEnum.class, SemanticModifiersEnum.static);
        break;

      case "this":
        Builder.AddWord(Word, SemanticTokensEnum.keyword, SemanticModifiersEnum.readonly);
        break;

      case "(":
      case "[":
      case "{":
      case "}":
      case "]":
      case ")":
      case "==":
      case "!=":
      case "&&":
      case "||":
      case "|=":
      case ">=":
      case "<=":
      case ">":
      case "!":
      case "<":
      case "?":
      case ":":
      case ";":
      case "+":
      case "-":
      case "/":
      case "*":
        Builder.AddWord(Word, SemanticTokensEnum.operator);
        break;

      default:
        ConvertWordsDefault(Words, I, Builder);
    }
  }
}

/**
 *
 * @param Words
 * @param Index
 * @param Builder
 */
function ConvertWordsDefault(Words: OffsetWord[], Index: number, Builder: JsonSemanticTokensBuilder): void {
  let Word = Words[Index];
  let text = Word.text;

  if (IsFloat(text)) {
    Builder.AddWord(Word, SemanticTokensEnum.number);
    return;
  }

  if (IsSelector(text, undefined)) {
    Builder.AddWord(Word, SemanticTokensEnum.variable);
    return;
  }

  if (Words[Index + 1]?.text === ":") {
    Builder.AddWord(Word, SemanticTokensEnum.namespace);
    return;
  }

  Builder.AddWord(Word, SemanticTokensEnum.method);
}

function findNext(text: string, startIndex: number): number {
  while (startIndex > -1) {
    startIndex = text.indexOf('"', startIndex);
    if (startIndex < 0) break;

    if (text.charAt(startIndex - 1) === "\\" && text.charAt(startIndex - 2) !== "\\") {
      startIndex++;
      continue;
    }

    return startIndex;
  }

  return -1;
}