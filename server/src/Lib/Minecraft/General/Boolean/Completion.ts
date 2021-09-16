import { CompletionBuilder } from "../../../Completion/Builder";
import { CommandCompletionContext } from "../../../Completion/Commands/include";
import { Kinds } from "../Kinds";

export function ProvideCompletion(context: CommandCompletionContext | CompletionBuilder): void {
  let receiver = CommandCompletionContext.is(context) ? context.receiver : context;

  //False
  receiver.Add("false", "The boolean value for false", Kinds.Completion.Boolean);

  //true
  receiver.Add("true", "The boolean value for true", Kinds.Completion.Boolean);
}