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
package org.apache.streampipes.model.node;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.gson.annotations.SerializedName;
import io.fogsy.empire.annotations.RdfProperty;
import io.fogsy.empire.annotations.RdfsClass;
import org.apache.streampipes.model.base.UnnamedStreamPipesEntity;
import org.apache.streampipes.model.node.container.DeploymentContainer;
import org.apache.streampipes.model.node.meta.StaticNodeMetadata;
import org.apache.streampipes.model.node.resources.NodeResource;
import org.apache.streampipes.model.shared.annotation.TsModel;
import org.apache.streampipes.vocabulary.StreamPipes;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@RdfsClass(StreamPipes.NODE_INFO_DESCRIPTION)
@Entity
@TsModel
public class NodeInfoDescription extends UnnamedStreamPipesEntity {

    private static final long serialVersionUID = 4294360613297596807L;
    protected static final String prefix = "urn:streampipes.org:nid:";

    @JsonProperty("_id")
    private @SerializedName("_id") String id;

    @JsonProperty("_rev")
    private @SerializedName("_rev") String rev;

    @OneToOne(cascade = CascadeType.ALL)
    private boolean active;

    @RdfProperty(StreamPipes.DEPLOYMENT_TARGET_NODE_ID)
    private String nodeControllerId;

    @RdfProperty(StreamPipes.DEPLOYMENT_TARGET_NODE_HOSTNAME)
    private String hostname;

    @RdfProperty(StreamPipes.DEPLOYMENT_TARGET_NODE_PORT)
    private int port;

    @OneToOne(fetch = FetchType.EAGER,
            cascade = {CascadeType.ALL})
    @RdfProperty(StreamPipes.HAS_NODE_BROKER)
    private NodeBrokerDescription nodeBroker;

    @OneToOne(fetch = FetchType.EAGER,
            cascade = {CascadeType.ALL})
    @RdfProperty(StreamPipes.HAS_STATIC_NODE_METADATA)
    private StaticNodeMetadata staticNodeMetadata;

    @OneToOne(fetch = FetchType.EAGER,
            cascade = {CascadeType.ALL})
    @RdfProperty(StreamPipes.HAS_NODE_RESOURCES)
    private NodeResource nodeResources;

    @OneToMany(fetch = FetchType.EAGER,
            cascade = {CascadeType.ALL})
    @RdfProperty(StreamPipes.HAS_CONTAINER)
    private List<DeploymentContainer> registeredContainers;

    @RdfProperty(StreamPipes.HAS_SUPPORTED_ELEMENTS)
    private List<String> supportedElements;

    public NodeInfoDescription() {
        super(prefix + UUID.randomUUID().toString());
    }

    public NodeInfoDescription(String elementId) {
        super(elementId);
        this.nodeControllerId = elementId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getRev() {
        return rev;
    }

    public void setRev(String rev) {
        this.rev = rev;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public NodeBrokerDescription getNodeBroker() {
        return nodeBroker;
    }

    public void setNodeBroker(NodeBrokerDescription nodeBroker) {
        this.nodeBroker = nodeBroker;
    }

    public StaticNodeMetadata getStaticNodeMetadata() {
        return staticNodeMetadata;
    }

    public void setStaticNodeMetadata(StaticNodeMetadata staticNodeMetadata) {
        this.staticNodeMetadata = staticNodeMetadata;
    }

    public NodeResource getNodeResources() {
        return nodeResources;
    }

    public void setNodeResources(NodeResource nodeResources) {
        this.nodeResources = nodeResources;
    }

    public List<DeploymentContainer> getRegisteredContainers() {
        return registeredContainers;
    }

    public void setRegisteredContainers(List<DeploymentContainer> registeredContainers) {
        this.registeredContainers = registeredContainers;
    }

    public String getNodeControllerId() {
        return nodeControllerId;
    }

    public void setNodeControllerId(String nodeControllerId) {
        this.nodeControllerId = nodeControllerId;
    }

    public String getHostname() {
        return hostname;
    }

    public void setHostname(String hostname) {
        this.hostname = hostname;
    }

    public int getPort() {
        return port;
    }

    public void setPort(int port) {
        this.port = port;
    }

    public List<String> getSupportedElements() {
        return supportedElements;
    }

    public void setSupportedElements(List<String> supportedElements) {
        this.supportedElements = supportedElements;
    }
}