import { TextDocument } from "../../Types/Document/TextDocument";
import { CompletionBuilder } from "../Builder";

export function OnCompletionMolangVariable(doc: TextDocument, receiver: CompletionBuilder): void {
  //TODO redo molang variable completion
  /**const Type = DetectDataType(doc.uri);
  const edu = doc.getConfiguration();

  switch (Type) {
    case DataType.resource_particle:
      Convert(Manager.Data.Vanilla.Molang.Particles.variable, receiver);
      if (edu) Convert(Manager.Data.Edu.Molang.Particles.variable, receiver);
      return;

    case DataType.behavior_animation:
    case DataType.behavior_animation_controller:
    case DataType.behavior_entity:
    case DataType.resource_animation:
    case DataType.resource_animation_controller:
    case DataType.resource_entity:
      Convert(Manager.Data.Vanilla.Molang.Entities.variable, receiver);
      if (edu) Convert(Manager.Data.Edu.Molang.Entities.variable, receiver);
      return;
  }
**/
}

/**
function Convert(data: MolangFunctionDataItem[], receiver: CompletionBuilder): void {
  for (let I = 0; I < data.length; I++) {
    let Item = data[I];

    receiver.Add(Item.function, Item.documentation, CompletionItemKind.Variable);
  }
}
**/
