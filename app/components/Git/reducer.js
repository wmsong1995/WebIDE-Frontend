/* @flow weak */
import _ from 'lodash'

import {
  GIT_STATUS,
  GIT_BRANCH,
  GIT_CHECKOUT,
  GIT_STAGE_FILE,
  GIT_UNSTAGE_FILE,
  GIT_UPDATE_COMMIT_MESSAGE,
  GIT_CURRENT_BRANCH,
  GIT_UPDATE_STASH_MESSAGE,
  GIT_UPDATE_STASH_LIST,
  GIT_SELECT_STASH,
  GIT_UPDATE_UNSTASH_IS_POP,
  GIT_UPDATE_UNSTASH_IS_REINSTATE,
  GIT_UPDATE_UNSTASH_BRANCH_NAME,
} from './actions'

const _state = {
  workingDir: {
    isClean: true,
    files: []
  },
  stagingArea: {
    files: [],
    commitMessage: ''
  },
  branches: {
    current: 'master'
  },
  stash: {
    stashMessage: '',
  },
  unstash: {
    stashList: [],
    selectedStash: null,
    isPop: false,
    isReinstate: false,
    newBranchName: '',
  },
}

export default function GitReducer (state = _state, action) {
  state = _.cloneDeep(state)
  switch (action.type) {

    case GIT_STATUS:
      state.workingDir = Object.assign({}, state.workingDir, action.payload)
      return state

    case GIT_UPDATE_COMMIT_MESSAGE:
      state.stagingArea.commitMessage = action.payload
      return state

    case GIT_STAGE_FILE:
      state.stagingArea.files = _.union(state.stagingArea.files, [action.payload.name])
      return state

    case GIT_UNSTAGE_FILE:
      state.stagingArea.files = _.without(state.stagingArea.files, action.payload.name)
      return state

    case GIT_BRANCH:
      state.branches = action.payload.branches
      return state

    case GIT_CHECKOUT:
      state.branches.current = action.branch
      return state

    case GIT_CURRENT_BRANCH:
      state.branches.current = action.payload.branch
      return state
    
    case GIT_UPDATE_STASH_MESSAGE:
      state.stash.stashMessage = action.payload
      return state

    case GIT_UPDATE_UNSTASH_IS_POP:
      state.unstash.isPop = action.payload
      return state

    case GIT_UPDATE_UNSTASH_IS_POP:
      state.unstash.isPop = action.isPop
      return state

    case GIT_UPDATE_UNSTASH_IS_REINSTATE:
      state.unstash.isReinstate = action.payload
      return state

    case GIT_UPDATE_UNSTASH_BRANCH_NAME:
      state.unstash.newBranchName = action.payload
      return state

    case GIT_UPDATE_STASH_LIST:
      state.unstash.stashList = action.payload
      if (state.unstash.stashList.length == 0) {
        state.unstash.selectedStash = null
      } else if(!state.unstash.selectedStash) {
        state.unstash.selectedStash = state.unstash.stashList[0]
      }
      return state

    case GIT_SELECT_STASH:
      state.unstash.selectedStash = action.payload
      return state
      
    default:
      return state
  }
}