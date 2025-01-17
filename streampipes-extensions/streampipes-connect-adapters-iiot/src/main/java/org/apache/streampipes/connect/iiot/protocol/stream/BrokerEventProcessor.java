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

package org.apache.streampipes.connect.iiot.protocol.stream;

import org.apache.commons.io.IOUtils;
import org.apache.streampipes.connect.SendToPipeline;
import org.apache.streampipes.connect.api.IParser;
import org.apache.streampipes.connect.api.exception.ParseException;
import org.apache.streampipes.messaging.InternalEventProcessor;

public class BrokerEventProcessor implements InternalEventProcessor<byte[]> {

  private SendToPipeline stk;
  private IParser parser;

  public BrokerEventProcessor(SendToPipeline stk,
                              IParser parser) {
    this.stk = stk;
    this.parser = parser;
  }

  @Override
  public void onEvent(byte[] payload) {
    try {
      parser.parse(IOUtils.toInputStream(new String(payload), "UTF-8"), stk);
    } catch (ParseException e) {
      e.printStackTrace();
      //logger.error("Adapter " + ID + " could not read value!",e);
    }
  }
}
