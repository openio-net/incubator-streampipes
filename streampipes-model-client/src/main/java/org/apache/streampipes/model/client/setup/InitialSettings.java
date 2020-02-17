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

package org.apache.streampipes.model.client.setup;

public class InitialSettings {


	private String adminEmail;
	private String adminPassword;
	private String couchDbHost;
	private String kafkaHost;
	private String zookeeperHost;
	private String jmsHost;
	private Boolean installPipelineElements;

	public InitialSettings(String adminEmail, String adminPassword, String couchDbHost, String kafkaHost, String zookeeperHost, String jmsHost, Boolean installPipelineElements) {
		this.adminEmail = adminEmail;
		this.adminPassword = adminPassword;
		this.couchDbHost = couchDbHost;
		this.kafkaHost = kafkaHost;
		this.zookeeperHost = zookeeperHost;
		this.jmsHost = jmsHost;
		this.installPipelineElements = installPipelineElements;
	}

	public InitialSettings() {
		// TODO Auto-generated constructor stub
	}

	public String getAdminPassword() {
		return adminPassword;
	}
	public void setAdminPassword(String adminPassword) {
		this.adminPassword = adminPassword;
	}

	public String getAdminEmail() {
		return adminEmail;
	}

	public void setAdminEmail(String adminEmail) {
		this.adminEmail = adminEmail;
	}

	public String getCouchDbHost() {
		return couchDbHost;
	}

	public void setCouchDbHost(String couchDbHost) {
		this.couchDbHost = couchDbHost;
    }

	public String getKafkaHost() {
		return kafkaHost;
	}

	public void setKafkaHost(String kafkaHost) {
		this.kafkaHost = kafkaHost;
	}

	public String getZookeeperHost() {
		return zookeeperHost;
	}

	public void setZookeeperHost(String zookeeperHost) {
		this.zookeeperHost = zookeeperHost;
	}

	public String getJmsHost() {
		return jmsHost;
	}

	public void setJmsHost(String jmsHost) {
		this.jmsHost = jmsHost;
	}

	public Boolean getInstallPipelineElements() {
		return installPipelineElements;
	}

	public void setInstallPipelineElements(Boolean installPipelineElements) {
		this.installPipelineElements = installPipelineElements;
	}
}