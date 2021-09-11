import { OffsetWord } from "bc-vscode-words";
import { Range } from "vscode-languageserver-textdocument";
import { SemanticTokens } from "vscode-languageserver/node";
import { CreateMolangWords } from "../Molang/Words";
import { TextDocument } from "../Types/Document/TextDocument";
import { IsFloat } from "../Types/General/Float/include";
import { IsSelector } from "../Types/General/Selector/include";
import { DetectGeneralDataType } from "../Types/Minecraft/Format/include";
import { JsonSemanticTokensBuilder } from "./Builders/JsonSemanticTokensBuilder";
import { MolangSemanticTokensBuilder } from "./Builders/MolangSemanticTokensBuilder";
import { SemanticModifiersEnum, SemanticTokensEnum } from "./Legend";

/**
 *
 * @param doc
 * @param range
 * @returns
 */
export function ProvideMolangSemanticTokens(doc: TextDocument, range?: Range | undefined): SemanticTokens {
  const Type = DetectGeneralDataType(doc.uri);

  const Builder = new MolangSemanticTokensBuilder(doc);
  const text = doc.getText(range);
  let offset = 0;

  if (range) {
    offset = doc.offsetAt(range.start);
  } else {
    offset = 0;
  }
  const Words = CreateMolangWords(text, offset);
  ConvertWords(Words, Builder);

  return Builder.Build();
}

/**
 *
 * @param Words
 * @param Builder
 */
export function ConvertWords(Words: OffsetWord[], Builder: JsonSemanticTokensBuilder | MolangSemanticTokensBuilder) {
  for (let I = 0; I < Words.length; I++) {
    const Word = Words[I];

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

      case "q":
      case "v":
      case "t":
      case "c":
      case "context":
      case "math":
      case "query":
      case "variable":
      case "temp":
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