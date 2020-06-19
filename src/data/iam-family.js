import getApi from './api';

const details = {};

details['authentication-policies'] = {
  type: 'iam-family',
  title: 'authentication-policies',
  variables: [],
  permissions: {
    inspect: {
      permissions: ["AUTHENTICATION_POLICY_INSPECT",],
      apis: [getApi('GetAuthenticationPolicy')]
    },
    read: {
      permissions: [],
      apis: []
    },
    use: {
      permissions: [],
      apis: []
    },
    manage: {
      permissions: ["AUTHENTICATION_POLICY_UPDATE"],
      apis: [getApi('UpdateAuthenticationPolicy')],
      partial_apis: []
    }
  }
}

details['compartments'] = {
  type: 'iam-family',
  title: 'compartments',
  variables: [{
    value: 'target.compartment.id',
    title: 'The Compartment OCID',
    type: 'Resource Specific'
  },{
    value: 'target.compartment.name',
    title: 'The Compartment Name',
    type: 'Resource Specific'
  }],
  permissions: {
    inspect: {
      permissions: ["COMPARTMENT_INSPECT",],
      apis: [getApi('ListCompartments'), getApi('GetCompartment'), getApi('ListAvailabilityDomains'), getApi('ListFaultDomains') ]
    },
    read: {
      permissions: [],
      apis: []
    },
    use: {
      permissions: ["COMPARTMENT_UPDATE"],
      apis: [getApi('UpdateCompartment'), getApi('GetWorkRequest')]
    },
    manage: {
      permissions: ["COMPARTMENT_CREATE", "COMPARTMENT_DELETE", "COMPARTMENT_RECOVER"],
      apis: [getApi('CreateCompartment'), getApi('DeleteCompartment'), getApi('RecoverCompartment')],
      partial_apis: []
    }
  }
}

details['credentials'] = {
  type: 'iam-family',
  title: 'credentials',
  variables: [],
  permissions: {
    inspect: {
      permissions: ["CREDENTIAL_INSPECT",],
      apis: [getApi('ListSmtpCredentials')]
    },
    read: {
      permissions: [],
      apis: []
    },
    use: {
      permissions: [],
      apis: []
    },
    manage: {
      permissions: ["CREDENTIAL_ADD", "CREDENTIAL_UPDATE", "CREDENTIAL_REMOVE"],
      apis: [getApi('CreateSmtpCredential'), getApi('UpdateSmtpCredential'),getApi('DeleteSmtpCredential')],
      partial_apis: []
    }
  }
}

details['dynamic-groups'] = {
  type: 'iam-family',
  title: 'dynamic-groups',
  variables: [],
  permissions: {
    inspect: {
      permissions: ["DYNAMIC_GROUP_INSPECT",],
      apis: [getApi('ListDynamicGroups'), getApi('GetDynamicGroup')]
    },
    read: {
      permissions: [],
      apis: []
    },
    use: {
      permissions: ["DYNAMIC_GROUP_UPDATE"],
      apis: [getApi('UpdateDynamicGroup')]
    },
    manage: {
      permissions: ["DYNAMIC_GROUP_CREATE", "DYNAMIC_GROUP_DELETE"],
      apis: [getApi('CreateDynamicGroup'), getApi('DeleteDynamicGroup')],
      partial_apis: []
    }
  }
}

details['groups'] = {
  type: 'iam-family',
  title: 'groups',
  variables: [{
    value: 'target.group.id',
    title: 'The Group OCID',
    type: 'Resource Specific'
  },{
    value: 'target.group.name',
    title: 'The Group Name',
    type: 'Resource Specific'
  },{
    value: 'target.group.member',
    title: 'True if request.user is a member of target group'
  }], 
  permissions: {
    inspect: {
      permissions: ["GROUP_INSPECT",],
      apis: [getApi('ListGroups'), getApi('GetGroup')],
      partial_apis: [
        getApi('GetUserGroupMembership', "also need 'inspect users'"),
        getApi('ListIdpGroupMappings', "also need 'inspect identity-providers'"),
        getApi('GetIdpGroupMapping', "also need 'inspect identity-providers'")
      ]
    },
    read: {
      permissions: [],
      apis: []
    },
    use: {
      permissions: ["GROUP_UPDATE"],
      apis: [getApi('UpdateGroup')],
      partial_apis: [
        getApi('AddUserToGroup', "also need 'use users'"),
        getApi('RemoveFromGroup', "also need 'use users'"),
        getApi('AddIdpGroupMapping', "also need 'manage identity-providers'"),
        getApi('DeleteIdpGroupMapping', "also need 'manage identity-providers'")
      ]
    },
    manage: {
      permissions: ["GROUP_CREATE", "GROUP_DELETE"],
      apis: [getApi('CreateGroup'), getApi('DeleteGroup')],
    }
  }
}

details['identity-providers'] = {
  type: 'iam-family',
  title: 'identity-providers',
  variables: [],
  permissions: {
    inspect: {
      permissions: ["IDENTITY_PROVIDER_INSPECT",],
      apis: [getApi('ListIdentityProviders'), getApi('GetIdentityProvider')],
      partial_apis: [
        getApi('ListIdpGroupMappings', "also need 'inspect groups'"),
        getApi('GetIdpGroupMapping', "also need 'inspect groups'")
      ]
    },
    read: {
      permissions: [],
      apis: []
    },
    use: {
      permissions: [],
      apis: []
    },
    manage: {
      permissions: ["IDENTITY_PROVIDER_UPDATE", "IDENTITY_PROVIDER_CREATE", "IDENTITY_PROVIDER_DELETE"],
      apis: [getApi('UpdateIdentityProvider'), getApi('CreateIdentityProvider'), getApi('DeleteIdentityProvider')],
      partial_apis: [
        getApi('AddIdpGroupMapping', "also need 'use groups'"),
        getApi('DeleteIdpGroupMapping', "also need 'use groups'")
      ]
    }
  }
}

details['network-sources'] = {
  type: 'iam-family',
  title: 'network-sources',
  variables: [],
  permissions: {
    inspect: {
      permissions: ["NETWORK_SOURCE_INSPECT",],
      apis: [getApi('ListNetworkSources'), getApi('GetNetworkSource')]
    },
    read: {
      permissions: [],
      apis: []
    },
    use: {
      permissions: ["NETWORK_SOURCE_UPDATE"],
      apis: [getApi('UpdateNetworkSource')]
    },
    manage: {
      permissions: ["NETWORK_SOURCE_CREATE", "NETWORK_SOURCE_DELETE"],
      apis: [getApi('CreateNetworkSource'), getApi('DeleteNetworkSource')],
      partial_apis: []
    }
  }
}

details['policies'] = {
  type: 'iam-family',
  title: 'policies',
  variables: [{
    value: 'target.policy.id',
    title: 'The Policy OCID',
    type: 'Resource Specific'
  },{
    value: 'target.policy.name',
    title: 'The Policy Name',
    type: 'Resource Specific'
  },{
    value: 'target.policy.autoupdate',
    title: 'Whether the policy uses Keep policy current as its version date'
  }],
  permissions: {
    inspect: {
      permissions: ["POLICY_READ",],
      apis: [getApi('ListPolicies'), getApi('GetPolicy')]
    },
    read: {
      permissions: [],
      apis: []
    },
    use: {
      permissions: [],
      apis: []
    },
    manage: {
      permissions: ["POLICY_UPDATE", "POLICY_CREATE", "POLICY_DELETE"],
      apis: [getApi('UpdatePolicy'), getApi('CreatePolicy'), getApi('DeletePolicy')],
      partial_apis: []
    }
  }
}

details['tag-namespaces'] = {
  type: 'iam-family',
  title: 'tag-namespaces',
  variables: [{
    value: 'target.tag-namespace.id',
    title: 'The Tag Namespace OCID',
    type: 'Resource Specific'
  },{
    value: 'target.tag-namespace.name',
    title: 'The Tag Namespace Name',
    type: 'Resource Specific'
  }],
  permissions: {
    inspect: {
      permissions: ["TAG_NAMESPACE_INSPECT",],
      apis: [getApi('ListTagNamespaces'), getApi('GetTagNamespace'), getApi('ListTags'), getApi('ListCostTrackingTags'), getApi('GetTag'), getApi('GetTaggingWorkRequest'), getApi('ListTaggingWorkRequest'), getApi('ListTaggingWorkRequestErrors'), getApi('ListTaggingWorkRequestLogs')]
    },
    read: {
      permissions: [],
      apis: []
    },
    use: {
      permissions: ["TAG_NAMESPACE_USE"],
      apis: [getApi('CreateTag'), getApi('UpdateTag')]
    },
    manage: {
      permissions: ["TAG_NAMESPACE_UPDATE", "TAG_NAMESPACE_CREATE", "TAG_NAMESPACE_MOVE", "TAG_NAMESPACE_DELETE"],
      apis: [getApi('UpdateTagNamespace'), getApi('CreateTagNamespace'), getApi('ChangeTagNamespaceCompartment'), getApi('CascadeDeleteTagNamespace'), getApi('DeleteTagNamespace'), getApi('DeleteTag'), getApi('BulkDeleteTags') ],
      partial_apis: []
    }
  }
}

details['tag-defaults'] = {
  type: 'iam-family',
  title: 'tag-defaults',
  variables: [],
  permissions: {
    inspect: {
      permissions: ["TAG_DEFAULT_INSPECT",],
      apis: [getApi('ListTagDefaults'), getApi('GetTagDefault')]
    },
    read: {
      permissions: [],
      apis: []
    },
    use: {
      permissions: [],
      apis: []
    },
    manage: {
      permissions: ["TAG_DEFAULT_CREATE", "TAG_DEFAULT_UPDATE", "TAG_DEFAULT_DELETE"],
      apis: [getApi('CreateTagDefault'), getApi('UpdateTagDefault'), getApi('DeleteTagDefault')],
      partial_apis: []
    }
  }
}

details['tenancies'] = {
  type: 'iam-family',
  title: 'tenancies',
  variables: [],
  permissions: {
    inspect: {
      permissions: ["TENANCY_INSPECT",],
      apis: [getApi('ListRegionSubscriptions'), getApi('GetTenancy'), getApi('ListRegions')]
    },
    read: {
      permissions: [],
      apis: []
    },
    use: {
      permissions: ["TENANCY_UPDATE"],
      apis: []
    },
    manage: {
      permissions: ["TENANCY_UPDATE"],
      apis: [getApi('CreateRegionSubscription')],
      partial_apis: []
    }
  }
}

details['users'] = {
  type: 'iam-family',
  title: 'users',
  variables: [{
    value: 'target.user.id',
    title: 'The User OCID',
    type: 'Resource Specific'
  },{
    value: 'target.user.name',
    title: 'The User Name',
    type: 'Resource Specific'
  }],
  permissions: {
    inspect: {
      permissions: ["USER_INSPECT",],
      apis: [getApi('ListUsers'), getApi('ListUsers')],
      partial_apis: [getApi('GetUserGroupMembership', "also need 'inspect groups'")]
    },
    read: {
      permissions: ["USER_READ"],
      apis: [getApi('ListApiKeys'), getApi('ListSwiftPasswords'), getApi('ListAuthTokens'), getApi('ListCustomerSecretKeys'), getApi('ListMfaTotpDevices')]
    },
    use: {
      permissions: ["USER_UPDATE"],
      apis: [getApi('UpdateUser')],
      partial_apis: [
        getApi('AddUserToGroup', "also need 'use groups'"),
        getApi('RemoveUserFromGroup', "also need 'use groups'"),

      ]
    },
    manage: {
      permissions: ["USER_CREATE", "USER_DELETE", "USER_UNBLOCK", "USER_APIKEY_ADD", "USER_APIKEY_REMOVE", "USER_UIPASS_SET", "USER_UIPASS_RESET", "USER_SWIFTPASS_SET", "USER_SWIFTPASS_RESET", "USER_SWIFTPASS_REMOVE", "USER_AUTHTOKEN_SET", "USER_AUTHTOKEN_RESET", "USER_AUTHTOKEN_REMOVE", "USER_SECRETKEY_ADD", "USER_SECRETKEY_UPDATE", "USER_SECRETKEY_REMOVE", "USER_SUPPORT_ACCOUNT_LINK", "USER_SUPPORT_ACCOUNT_UNLINK", "USER_TOTPDEVICE_ADD", "USER_TOTPDEVICE_REMOVE", "USER_TOTPDEVICE_UPDATE"],
      apis: [getApi('CreateUser'), getApi('DeleteUser'), getApi('UpdateUserState'), getApi('UploadApiKey'), getApi('DeleteApiKey'), getApi('CreateOrResetUIPassword'), getApi('UpdateSwiftPassword'), getApi('CreateSwiftPassword'), getApi('DeleteSwiftPassword'), getApi('UpdateAuthToken'), getApi('CreateAuthToken'), getApi('DeleteAuthToken'), getApi('CreateSecretKey'), getApi('UpdateCustomerSecretKey'), getApi('DeleteCustomerSecretKey'), getApi('LinkSupportAccount'), getApi('UnlinkSupportAccount'), getApi('CreateMfaTotpDevice'), getApi('ActivateMfaTotpDevice'), getApi('DeleteMfaTotpDevice')],
      partial_apis: []
    }
  }
}

export default details;