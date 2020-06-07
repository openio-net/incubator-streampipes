/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import {
  DataProcessorInvocation,
  DataSinkInvocation, SpDataSet,
  SpDataStream
} from "../../core-model/gen/streampipes-model";
import {EditorConstants} from "../constants/editor.constants";

export type PipelineElementHolder = {
  [key: string]: Array<PipelineElementUnion>;
};

export interface PipelineElementConfig {
  type: string,
  settings: {
    openCustomize: boolean,
    preview: boolean,
    displaySettings: string,
    connectable: string,
    disabled: boolean,
    loadingStatus: boolean
    position: {
      x: number,
      y: number
    }
  },
  payload: PipelineElementUnion
}

export enum PipelineElementType {
  DataSet,
  DataStream,
  DataProcessor,
  DataSink
}

export type PipelineElementUnion = SpDataSet | SpDataStream | DataProcessorInvocation | DataSinkInvocation;

export type InvocablePipelineElementUnion = DataProcessorInvocation | DataSinkInvocation;