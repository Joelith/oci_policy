import getApi from './api';

const details = {};

details['dns'] = {
  type: 'dns',
  title: 'dns',
  variables: [],
  permissions: {
    inspect: {
      permissions: [],
      apis: []
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
      permissions: [],
      apis: [],
      partial_apis: []
    }
  }
}

details['dns-zones'] = {
  type: 'dns',
  title: 'dns-zones',
  variables: [{
    value: 'target.dns-zone.id',
    title: 'Control access to specific DNS zone with OCID',
    type: 'Resource Specific'
  },{
    value: 'target.dns-zone.name',
    title: 'Control access to specific DNS zone with name',
    type: 'Resource Specific'
  },{
    value: 'target.dns-zone.apex-label',
    title: 'The most significant DNS label for the target zone',
    type: 'Resource Specific'
  },{
    value: 'target.dns-zone.parent-domain',
    title: 'The domain name of the target zones parent zone',
    type: 'Resource Specific'
  },{
    value: 'target.dns.scope',
    title: 'DNS Scope - public or private',
    type: 'Resource Specific'
  }],
  permissions: {
    inspect: {
      permissions: ["DNS_ZONE_INSPECT"],
      apis: [getApi('ListZones')]
    },
    read: {
      permissions: ["DNS_ZONE_READ"],
      apis: [getApi('GetZone')],
      partial_apis: [getApi('GetZoneRecords')]
    },
    use: {
      permissions: ["DNS_ZONE_UPDATE"],
      apis: [getApi('UpdateZone')],
      partial_apis: [getApi('UpdateZoneRecords'), getApi('PatchZoneRecords'), getApi('CreateSteeringPolicyAttachment'), getApi('DeleteSteeringPolicyAttachment')]
    },
    manage: {
      permissions: ["DNS_ZONE_CREATE", "DNS_ZONE_DELETE", "DNS_ZONE_MOVE"],
      apis: [getApi('CreateZone'), getApi('DeleteZone'), getApi('ChangeZoneCompartment')],
      partial_apis: []
    }
  }
}


details['dns-records'] = {
  type: 'dns',
  title: 'dns-records',
  variables: [{
    value: 'target.dns-zone.id',
    title: 'Control access to specific DNS zone with OCID',
    type: 'Resource Specific'
  },{
    value: 'target.dns-zone.name',
    title: 'Control access to specific DNS zone with name',
    type: 'Resource Specific'
  },{
    value: 'target.dns-record.type',
    title: 'Control access by DNS Type (A, AAA, TXT etc)',
    type: 'Resource Specific'
  },{
    value: 'target.dns-domain.name',
    title: 'Control by specific domain name',
    type: 'Resource Specific'
  },{
    value: 'target.dns-zone.source-compartment.id',
    title: 'Source Compartment OCID',
    type: 'Resource Specific'
  },{
    value: 'target.dns-zone.destination-compartment.id',
    title: 'Destination Compartment OCID',
    type: 'Resource Specific'
  }],
  permissions: {
    inspect: {
      permissions: ["DNS_RECORD_INSPECT"],
      apis: []
    },
    read: {
      permissions: ["DNS_RECORD_READ"],
      apis: [getApi('GetDomainRecords'), getApi('GetRRSet')],
      partial_apis: [getApi('GetZoneRecords')]
    },
    use: {
      permissions: ["DNS_RECORD_UPDATE"],
      apis: [getApi('PatchDomainRecords'), getApi('UpdateDomainRecords'), getApi('DeleteRRSet'), getApi('PatchRRSet'), getApi('UpdateRRSet')],
      partial_apis: [getApi('UpdateZoneRecords'), getApi('PatchZoneRecords'), getApi('UpdateSteeringPolicyAttachment')]
    },
    manage: {
      permissions: ["DNS_RECORD_CREATE", "DNS_RECORD_DELETE"],
      apis: [],
      partial_apis: []
    }
  }
}

details['dns-steering-policies'] = {
  type: 'dns',
  title: 'dns-steering-policies',
  variables: [{
    value: 'target.dns-steering-policy.id',
    title: 'Control access to specific DNS steering policy with OCID',
    type: 'Resource Specific'
  },{
    value: 'target.dns-steering-policy.display-name',
    title: 'Control access to specific DNS steering policy with name',
    type: 'Resource Specific'
  },{
    value: 'target.dns-steering-policy.source-compartment.id',
    title: 'Source Compartment OCID',
    type: 'Resource Specific'
  },{
    value: 'target.dns-steering-policy.destination-compartment.id',
    title: 'Destination Compartment OCID',
    type: 'Resource Specific'
  }],
  permissions: {
    inspect: {
      permissions: ["DNS_STEERING_POLICY_INSPECT"],
      apis: [getApi('ListSteeringPolicies')]
    },
    read: {
      permissions: ["DNS_STEERING_POLICY_READ"],
      apis: [getApi('GetSteeringPolicy')],
      partial_apis: [getApi('CreateSteeringPolicyAttachment'), getApi('UpdateSteeringPolicyAttachment'), getApi('DeleteSteeringPolicyAttachment')]
    },
    use: {
      permissions: ["DNS_STEERING_POLICY_UPDATE"],
      apis: [getApi('UpdateSteeringPolicy')],
      partial_apis: []
    },
    manage: {
      permissions: ["DNS_STEERING_POLICY_CREATE", "DNS_STEERING_POLICY_DELETE", "DNS_STEERING_POLICY_MOVE"],
      apis: [getApi('CreateSteeringPolicy'), getApi('DeleteSteeringPolicy'), getApi('ChangeSteeringPolicyCompartment')],
      partial_apis: []
    }
  }
}


details['dns-steering-policy-attachments'] = {
  type: 'dns',
  title: 'dns-steering-policy-attachments',
  variables: [],
  permissions: {
    inspect: {
      permissions: ["DNS_STEERING_POLICY_ATTACHMENT_INSPECT"],
      apis: [getApi('ListSteeringPolicyAttachments')]
    },
    read: {
      permissions: ["DNS_STEERING_POLICY_ATTACHMENT_READ"],
      apis: [getApi('GetSteeringPolicyAttachment')],
      partial_apis: []
    },
    use: {
      permissions: [],
      apis: [],
      partial_apis: []
    },
    manage: {
      permissions: [],
      apis: [],
      partial_apis: []
    }
  }
}

details['dns-tsig-keys'] = {
  type: 'dns',
  title: 'dns-tsig-keys',
  variables: [{
    value: 'target.dns-tsig-key.id',
    title: 'Control access to specific TSIG keys with OCID',
    type: 'Resource Specific'
  },{
    value: 'target.dns-tsig-keys.display-name',
    title: 'Control access to specific TSIG keys with name',
    type: 'Resource Specific'
  },{
    value: 'target.dns-tsig-keys.source-compartment.id',
    title: 'Source Compartment OCID',
    type: 'Resource Specific'
  },{
    value: 'target.dns-tsig-keys.destination-compartment.id',
    title: 'Destination Compartment OCID',
    type: 'Resource Specific'
  }],
  permissions: {
    inspect: {
      permissions: ["DNS_TSIG_KEY_INSPECT"],
      apis: [getApi('ListTsigKeys')]
    },
    read: {
      permissions: ["DNS_TSIG_KEY_READ"],
      apis: [getApi('GetTsigKey')]
    },
    use: {
      permissions: ["DNS_TSIG_KEY_UPDATE"],
      apis: [getApi('UpdateTsigKey')]
    },
    manage: {
      permissions: ["DNS_TSIG_KEY_CREATE", "DNS_TSIG_KEY_DELETE", "DNS_TSIG_KEY_MOVE"],
      apis: [getApi('CreateTsigKey'), getApi('DeleteTsigKey'), getApi('ChangeTsigKeyCompartment')],
      partial_apis: []
    }
  }
}



export default details;
