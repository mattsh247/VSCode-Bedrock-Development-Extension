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
import { TextDocument } from 'vscode-languageserver-textdocument';
import { RangedWord } from '../code/Words';
import { Database } from '../minecraft/Database';
import { MinecraftData } from '../minecraft/Minecraft Data';
import { Location, Range } from 'vscode-languageserver';
import { Tag } from '../minecraft/types/Tag';
import { Objective } from '../minecraft/types/Objectives';

export function Process(document : TextDocument) : MinecraftData {
   console.log('Processing mcfunction: ' + document.uri);
   var Lines = document.getText().split('\n');
   var Data = new MinecraftData();
   var uri = document.uri;

   for (var Index = 0; Index < Lines.length; Index++) {
      const Line = Lines[Index];
      
      if (Line.startsWith("#"))
         continue;

      if (Line.includes('tag')) {
         var Match = Line.match(/(tag .* add )(\w*)/);

         if (Match && Match.length >= 3){
            var TagText = Match[2];
            var FindAt = Line.indexOf(TagText);

            Data.Tag.push(new Tag(TagText, uri, Index, FindAt));
         }
      }

      if (Line.includes('scoreboard objectives add')) {
         var Match = Line.match(/(scoreboard objectives add )(\w*)( dummy)/);

         if (Match && Match.length >= 4){
            var ObjectiveText = Match[2];
            var FindAt = Line.indexOf(ObjectiveText);

            Data.Objectives.push(new Objective(ObjectiveText, uri, Index, FindAt));
         }
      }
   }

   Database.Set(document.uri, Data);
   return Data;
}
