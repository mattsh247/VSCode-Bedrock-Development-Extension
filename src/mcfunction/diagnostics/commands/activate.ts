import { DiagnosticsManager } from "../DiagnosticsManager";

//Import commands
import { AlwaysDayDiagnosticProvider } from "./AlwaysdayDiagnostics";
import { ClearDiagnosticProvider } from "./ClearDiagnostics";
import { CloneDiagnosticProvider } from "./CloneDiagnostics";
import { ConnectDiagnosticProvider } from "./ConnectDiagnostics";
import { DaylockDiagnosticProvider } from "./DaylockDiagnostics";
import { DeopDiagnosticProvider } from "./DeopDiagnostics";
import { DifficultyDiagnosticProvider } from "./DifficultyDiagnostics";
import { EffectDiagnosticProvider } from "./EffectDiagnostics";
import { EnchantDiagnosticProvider } from "./EnchantDiagnostics";
import { ExecuteDiagnosticProvider } from "./ExecuteDiagnostic";
import { FillDiagnosticProvider } from "./FillDiagnostics";
import { FunctionCommandDiagnosticProvider } from "./FunctionDiagnostic";
import { GamemodeDiagnosticProvider } from "./GamemodeDiagnostics";
import { GameruleDiagnosticProvider } from "./GameruleDiagnostics";
import { XpDiagnosticProvider } from "./XpDiagnostics";
import { WeatherDiagnosticProvider } from "./weatherDiagnostics";
import { LocateDiagnosticProvider } from "./locateDiagnostics";
import { MeDiagnosticProvider } from "./meDiagnostics";
import { MobeventDiagnosticProvider } from "./mobeventDiagnostics";
import { KillDiagnosticProvider } from "./KillDiagnostics";
import { MsgDiagnosticProvider } from "./msgDiagnostics";
import { GiveDiagnosticProvider } from "./giveDiagnostics";
import { ParticleDiagnosticProvider } from "./particleDiagnostics";
import { ReloadDiagnosticProvider } from "./reloadDiagnostics";
import { PlaysoundDiagnosticProvider } from "./playsoundDiagnostics";
import { SayDiagnosticProvider } from "./sayDiagnostics";
import { ReplaceItemDiagnosticProvider } from "./replaceitemDiagnostics";
import { ScoreboardDiagnosticProvider } from "./scoreboardDiagnostics";
import { SetblockDiagnosticProvider } from "./setblockDiagnostics";
import { SetmaxplayersDiagnosticProvider } from "./setmaxplayersDiagnostics";
import { SetWorldSpawnDiagnosticProvider } from "./setworldspawnDiagnostics";
import { SpawnpointDiagnosticProvider } from "./spawnpointDiagnostics";
import { StopsoundDiagnosticProvider } from "./stopsoundDiagnostics";
import { SpreadPlayersDiagnosticProvider } from "./spreadplayersDiagnostics";
import { TagDiagnosticProvider } from "./tagDiagnostics";
import { SummonDiagnosticProvider } from "./summonDiagnostics";
import { TellDiagnosticProvider } from "./tellDiagnostics";
import { TellrawDiagnosticProvider } from "./tellrawDiagnostics";
import { TeleportDiagnosticProvider } from "./teleportDiagnostics";
import { WDiagnosticProvider } from "./wDiagnostics";
import { ToggledownfallDiagnosticProvider } from "./toggledownfallDiagnostics";
import { TitlerawDiagnosticProvider } from "./titlerawDiagnostics";
import { TitleDiagnosticProvider } from "./titleDiagnostics";
import { TimeDiagnosticProvider } from "./timeDiagnostics";

//Add commands to the diagnoser
export function activate(context: DiagnosticsManager) {
    console.log('\tThe command diagnosers want to talk to the manager');
    context.set(new AlwaysDayDiagnosticProvider(), ["alwaysday"]);
    context.set(new ClearDiagnosticProvider(), [ "clear" ]);
    context.set(new CloneDiagnosticProvider(), ["clone"]);
    context.set(new ConnectDiagnosticProvider(), ["connect"]);
    context.set(new DaylockDiagnosticProvider(), [ "daylock" ]);
    context.set(new DeopDiagnosticProvider(), [ "deop" ]);
    context.set(new DifficultyDiagnosticProvider(), ["difficulty"]);
    context.set(new EffectDiagnosticProvider(), ["effect"]);
    context.set(new EnchantDiagnosticProvider(), ["effect"]);
    context.set(new ExecuteDiagnosticProvider(), ["execute"]);
    context.set(new FillDiagnosticProvider(), ["fill"]);
    context.set(new FunctionCommandDiagnosticProvider(), [ "function" ]);
    context.set(new GamemodeDiagnosticProvider(), [ "gamemode" ]);
    context.set(new GameruleDiagnosticProvider(), [ "gamerule" ]);
    context.set(new GiveDiagnosticProvider(), [ "give" ]);
    context.set(new LocateDiagnosticProvider(), [ "locate" ]);
    context.set(new MeDiagnosticProvider(), [ "me" ]);
    context.set(new MobeventDiagnosticProvider(), [ "mobevent" ]);
    context.set(new KillDiagnosticProvider(), [ "kill" ]);
    context.set(new MsgDiagnosticProvider(), [ "msg" ]);
    context.set(new ParticleDiagnosticProvider(), [ "particle" ]);
    context.set(new PlaysoundDiagnosticProvider(), [ "playsound" ]);
    context.set(new ReloadDiagnosticProvider(), [ "reload" ]);
    context.set(new ReplaceItemDiagnosticProvider(), [ "replaceitem" ]);
    context.set(new SayDiagnosticProvider(), [ "say" ]);
    context.set(new ScoreboardDiagnosticProvider(), [ "scoreboard" ]);
    context.set(new SetblockDiagnosticProvider(), [ "setblock" ]);
    context.set(new SetmaxplayersDiagnosticProvider(), [ "setmaxplayers" ]);
    context.set(new SetWorldSpawnDiagnosticProvider(), [ "setworldspawn" ]);
    context.set(new SpawnpointDiagnosticProvider(), [ "spawnpoint" ]);
    context.set(new StopsoundDiagnosticProvider(), [ "stopsound" ]);
    context.set(new SpreadPlayersDiagnosticProvider(), [ "spreadplayers" ]);
    context.set(new SummonDiagnosticProvider(), [ "summon" ]);
    context.set(new TagDiagnosticProvider(), [ "tag" ]);
    context.set(new TellDiagnosticProvider(), [ "tell" ]);
    context.set(new TellrawDiagnosticProvider(), [ "tellraw" ]);
    context.set(new TeleportDiagnosticProvider(), [ "teleport", "tp" ]);
    context.set(new WDiagnosticProvider(), [ "w" ]);
    context.set(new ToggledownfallDiagnosticProvider(), [ "toggledownfall" ]);
    context.set(new TitleDiagnosticProvider(), [ "title" ]);
    context.set(new TitlerawDiagnosticProvider(), [ "titleraw" ]);
    context.set(new TimeDiagnosticProvider(), [ "time" ]);


    
    context.set(new WeatherDiagnosticProvider(), [ "weather" ]);
    context.set(new XpDiagnosticProvider(), [ "xp" ]);
}
