'use strict';

import Reflux from 'reflux';
import API from '../util/api';
import Actions from '../actions/Actions';

let data = {
  agents: {},
  currentAgent: null
};

let agentsHash = function(agents) {
  var result = {};
  agents.forEach(function(agent) { result[agent.id] = agent; });
  return result;
};

const AgentStore = Reflux.createStore({
  listenables: Actions,

  onFetchAgents() {
    var _this = this;
    API.fetchData('agents').then(function(agents) {
      data = { agents: agentsHash(agents.data), currentAgent: data.currentAgent };
      _this.trigger(data);
    }).fail(function(error) {
      Actions.modalError(error.responseText);
    });
  },

  onFetchAgent() {
    var _this = this;
    API.fetchData('agent').then(function(agent) {
      data = { agents: data.agents, currentAgent: agent.data};
      _this.trigger(data);
    }).fail(function(error) {
      Actions.modalError(error.responseText);
    });
  },

  onAgentLogin(loginData) {
    var _this = this;
    API.agentLogin(loginData).then(function(agent) {
      data = { agents: data.agents, currentAgent: agent.data };
      _this.trigger(data);
      Actions.nextModal();
    }).fail(function(error) {
      Actions.modalError(error.responseText);
    });
  },

  onAgentLogout() {
    data = { agents: data.agents, currentAgent: null };
    this.trigger(data);
  },

  getDefaultData() {
    return data;
  },

  getAgent(id) {
    return data.agents[id];
  },

  getAgents() {
    return data.agents;
  },

  getCurrentAgent() {
    return data.currentAgent;
  }
});

export default AgentStore;
