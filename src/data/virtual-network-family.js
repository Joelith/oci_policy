import getApi from './api';

const details = {};

details['virtual-network-family'] = {
  type: 'virtual-network-family',
  title: 'virtual-network-family',
  variables: [{
    value: 'target.boot-volume.kms-key.id',
    title: 'Whether compute instances can be launched with boot volumes created without a Vault service master encryption key',
    type: 'Resource Specific'
  }],
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

details['network-security-groups'] = {
  type: 'virtual-network-family',
  title: 'network-security-groups',
  variables: [{
    value: 'target.boot-volume.kms-key.id',
    title: 'Whether compute instances can be launched with boot volumes created without a Vault service master encryption key',
    type: 'Resource Specific'
  }], 
  permissions: {
    inspect: {
      permissions: ["NETWORK_SECURITY_GROUP_INSPECT"],
      apis: [],
      partial_apis: [
        getApi('AddNetworkSecurityGroupSecurityRules', "also need 'manage network-security-groups"),
        getApi('UpdateNetworkSecurityGroupSecurityRules', "also need 'manage network-security-groups")
      ]
    },
    read: {
      permissions: ["NETWORK_SECURITY_GROUP_READ"],
      apis: [getApi('GetNetworkSecurityGroup', 'ListNetworkSecurityGroups')]
    },
    use: {
      permissions: ["NETWORK_SECURITY_GROUP_LIST_SECURITY_RULES", "NETWORK_SECURITY_GROUP_LIST_MEMBERS", "NETWORK_SECURITY_GROUP_UPDATE_MEMBERS"],
      apis: [getApi('ListNetworkSecurityGroupSecurityRules'), getApi('ListNetworkSecurityGroupVnics')],
      partial_apis: [
        getApi('LaunchInstance', "also need 'manage instances', 'read instance-images', 'use vnics', 'use subnets', 'read app-catalog-listing'"),
        getApi('AttachVnic', "also need 'manage instances', 'use subnets'"),
        getApi('UpdateVnic', "also need 'use vnics'")
      ]
    },
    manage: {
      permissions: ["NETWORK_SECURITY_GROUP_UPDATE", "NETWORK_SECURITY_GROUP_CREATE", "NETWORK_SECURITY_GROUP_DELETE", "NETWORK_SECURITY_GROUP_MOVE", "NETWORK_SECURITY_GROUP_UPDATE_SECURITY_RULES"],
      apis: [getApi('UpdateNetworkSecurityGroup'), getApi('ChangeNetworkSecurityGroupCompartment'), getApi('AddNetworkSecurityGroupSecurityRules'), getApi('UpdateNetworkSecurityGroupSecurityRules'), getApi('RemoveNetworkSecurityGroupSecurityRules')],
      partial_apis: [
        getApi('CreateNetworkSecurityGroup', "also need 'manage vcns'"),
        getApi('DeleteNetworkSecurityGroup', "also need 'manage vcns'")
      ]
    }
  }
};

details.vcns = {
  type: 'virtual-network-family',
  title: 'vcns',
  variables: [{
    value: 'target.boot-volume.kms-key.id',
    title: 'Whether compute instances can be launched with boot volumes created without a Vault service master encryption key',
    type: 'Resource Specific'
  }], 
  permissions: {
    inspect: {
      permissions: ["VCN_READ"],
      apis: [getApi('ListVcns'), getApi('GetVcn')],
      partial_apis: [
        getApi('CreateNatGateway', "also need 'manage nat-gateways' and 'manage vcns' or just use 'manage virtual-network-family'"),
        getApi('DeleteNatGateway', "also need 'manage nat-gateways' and 'manage vcns' or just use 'manage virtual-network-family'"),
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
      permissions: ["VCN_ATTACH", "VCN_DETACH", "VCN_UPDATE", "VCN_CREATE", "VCN_DELETE", "VCN_MOVE"],
      apis: [getApi('CreateVcn'), getApi('UpdateVcn'), getApi('DeleteVcn'), getApi('ChangeVcnCompartment')],
      partial_apis: [
        getApi('CreateSubnet', "also need 'manage route-tables', 'manage security-lists', and 'manage dhcp-options' or just use 'manage virtual-network-family'"),
        getApi('DeleteSubnet', "also need 'manage route-tables', 'manage security-lists', and 'manage dhcp-options' or just use 'manage virtual-network-family'"),
        getApi('CreateInternetGateway', "also need 'manage internet-gateways'"),
        getApi('DeleteInternetGateway', "also need 'manage internet-gateways'"),
        getApi('CreateLocalPeeringGateway', "also need 'manage local-peering-gateways' and 'manage route-tables' if you associate a route table during creation"),
        getApi('DeleteLocalPeeringGateway', "also need 'manage local-peering-gateways'"),
        getApi('CreateNatGateway', "also need 'manage nat-gateways'"),
        getApi('DeleteNatGateway', "also need 'manage nat-gateways'"),
        getApi('CreateNetworkSecurityGroup', "also need 'manage network-security-groups'"),
        getApi('DeleteNetworkSecurityGroup', "also need 'manage network-security-groups'"),
        getApi('CreateRouteTable', "also need 'manage route-tables', 'manage internet-gateways', 'manage drgs', 'manage private-ips', 'manage local-peering-gateways', 'use nat-gateways' and 'use service-gateways'"),
        getApi('CreateServiceGateway', "also need 'manage service-gateways'"),
        getApi('DeleteServiceGateway', "also need 'manage service-gateways'"),
        getApi('CreateSecurityList', "also need 'manage service-lists'"),
        getApi('DeleteSecurityList', "also need 'manage service-lists'"),
        getApi('CreateDhcpOptions', "also need 'manage dhcp-options'"),
        getApi('DeleteDhcpOptions', "also need 'manage dhcp-options'"),
        getApi('CreateDrgAttachment', "also need 'manage drg' and 'manage route-tables"),
        getApi('DeleteDrgAttachment', "also need 'manage drg' and 'manage route-tables")
      ]
    }
  }
};

details.subnets = {
  type: 'virtual-network-family',
  title: 'subnets',
  variables: [{
    value: 'target.boot-volume.kms-key.id',
    title: 'Whether compute instances can be launched with boot volumes created without a Vault service master encryption key',
    type: 'Resource Specific'
  }], 
  permissions: {
    inspect: {
      permissions: ["SUBNET_READ"],
      apis: [getApi('ListSubnets'), getApi('GetSubnet')]
    },
    read: {
      permissions: [],
      apis: []
    },
    use: {
      permissions: ["SUBNET_ATTACH", "SUBNET_DETACH"],
      apis: [],
      partial_apis: [
        getApi('LaunchInstance', "also need 'use vnics', 'use network-security-groups' and 'manage instance-family'"),
        getApi('TerminateInstance', "also need 'manage instance-family' and 'use volumes' if a volume is attached"),
        getApi('AttachVnic', "also need 'manage instances', 'use network-security-groups' and either 'use vnics' or 'use instance-family'"),
        getApi('DetachVnic', "also need 'manage instances' and either 'use vnics' or 'use instance-family'"),
        getApi('CreatePrivateIp', "also need 'use private-ips' and 'use vnics'"),
        getApi('DeletePrivateIp', "also need 'use private-ips' and 'use vnics'")
      ]
    },
    manage: {
      permissions: ["SUBNET_CREATE", "SUBNET_UPDATE", "SUBNET_DELETE", "SUBNET_MOVE"],
      apis: [getApi('ChangeSubnetCompartment')],
      partial_apis: [
        getApi('CreateSubnet', "also need 'manage vcns', 'manage route-tables', 'manage security-lists', 'manage dhcp-options'"),
        getApi('DeleteSubnet', "also need 'manage vcns', 'manage route-tables', 'manage security-lists', 'manage dhcp-options'"),
        getApi('UpdateSubnet', "also need 'manage route-tables' if changing which route table is associated with the subnet, 'manage security-lists' if chaning which security lists are associated with the subnet and manage dhcp-options' if changing which set of DHCP options is associated with the subnet")
      ]
    }
  }
};

details['route-tables'] = {
  type: 'virtual-network-family',
  title: 'route-tables',
  variables: [{
    value: 'target.boot-volume.kms-key.id',
    title: 'Whether compute instances can be launched with boot volumes created without a Vault service master encryption key',
    type: 'Resource Specific'
  }], 
  permissions: {
    inspect: {
      permissions: ["ROUTE_TABLE_READ"],
      apis: [getApi('ListRouteTables'), getApi('GetRouteTable')]
    },
    read: {
      permissions: [],
      apis: []
    },
    use: {
      permissions: [],
      apis: [],
      partial_apis: []
    },
    manage: {
      permissions: ["ROUTE_TABLE_ATTACH", "ROUTE_TABLE_DETACH", "ROUTE_TABLE_UPDATE", "ROUTE_TABLE_DELETE", "ROUTE_TABLE_CREATE", "ROUTE_TABLE_MOVE"],
      apis: [],
      partial_apis: [
        getApi('CreateRouteTable', "also need 'manage vcns', 'manage internet-gateways', 'manage drgs', 'manage private-ips', 'manage local-peering-gateways', 'use nat-gateways' and 'use service-gateways'"),
        getApi('DeleteRouteTable', "also need 'manage vcns', 'manage internet-gateways', 'manage drgs', 'manage private-ips', 'manage local-peering-gateways', 'use nat-gateways' and 'use service-gateways'"),
        getApi('UpdateRouteTable', "also need 'manage internet-gateways', 'manage drgs', 'manage private-ips', 'manage local-peering-gateways', 'use nat-gateways' and 'use service-gateways'"),
        getApi('CreateSubnet', "also need 'manage vcns', 'manage subnets', 'manage security-lists', and 'manage dhcp-options'"),
        getApi('DeleteSubnet', "also need 'manage vcns', 'manage subnets', 'manage security-lists', and 'manage dhcp-options'"),

        getApi('UpdateSubnet', "also need 'manage subnets' if changing which route is associated with the subnet"),
      ]
    }
  }
};

details['security-lists'] = {
  type: 'virtual-network-family',
  title: 'security-lists',
  variables: [{
    value: 'target.boot-volume.kms-key.id',
    title: 'Whether compute instances can be launched with boot volumes created without a Vault service master encryption key',
    type: 'Resource Specific'
  }], 
  permissions: {
    inspect: {
      permissions: ["SECURITY_LIST_READ"],
      apis: [getApi('ListSecurityLists'), getApi('GetSecuritylist')]
    },
    read: {
      permissions: [],
      apis: []
    },
    use: {
      permissions: [],
      apis: [],
    },
    manage: {
      permissions: ["SECURITY_LIST_ATTACH", "SECURITY_LIST_DETACH", "SECURITY_LIST_UPDATE", "SECURITY_LIST_CREATE", "SECURITY_LIST_DELETE", "SECURITY_LIST_MOVE"],
      apis: [getApi('UpdateSecurityList'), getApi('ChangeSecurityListCompartment')],
      partial_apis: [
        getApi('CreateSecurityList', "also need 'manage vcns'"),
        getApi('DeleteSecurityList', "also need 'manage vcns'"),
        getApi('CreateSubnet', "also need 'manage vcns', 'manage subnets', 'manage route-tables',  and 'manage dhcp-options'"),
        getApi('DeleteSubnet', "also need 'manage vcns', 'manage subnets', 'manage security-lists', and 'manage dhcp-options'"),

        getApi('UpdateSubnet', "also need 'manage subnets' if changing which security list is associated with the subnet"),
      ]
    }
  }
};

details['dhcp-options'] = {
  type: 'virtual-network-family',
  title: 'dhcp-options',
  variables: [{
    value: 'target.boot-volume.kms-key.id',
    title: 'Whether compute instances can be launched with boot volumes created without a Vault service master encryption key',
    type: 'Resource Specific'
  }], 
  permissions: {
    inspect: {
      permissions: ["DHCP_READ"],
      apis: [getApi('ListDhcpOptions'), getApi('GetDhcpOptions')]
    },
    read: {
      permissions: [],
      apis: []
    },
    use: {
      permissions: [],
      apis: [],
    },
    manage: {
      permissions: ["DHCP_ATTACH", "DHCP_DETACH", "DHCP_UPDATE", "DHCP_CREATE", "DHCP_DELETE", "DHCP_MOVE"],
      apis: [getApi('UpdateDhcpOptions'), getApi('ChangeDhcpOptionsCompartment')],
      partial_apis: [
        getApi('CreateDhcpOptions', "also need 'manage vcns'"),
        getApi('DeleteDhcpOptions', "also need 'manage vcns'"),
        getApi('CreateSubnet', "also need 'manage vcns', 'manage subnets', 'manage route-tables',  and 'manage security-lists'"),
        getApi('DeleteSubnet', "also need 'manage vcns', 'manage subnets', 'manage security-lists', and 'manage security-lists'"),

        getApi('UpdateSubnet', "also need 'manage subnets' if changing which DHCP option is associated with the subnet"),
      ]
    }
  }
};


details['private-ips'] = {
  type: 'virtual-network-family',
  title: 'private-ips',
  variables: [{
    value: 'target.boot-volume.kms-key.id',
    title: 'Whether compute instances can be launched with boot volumes created without a Vault service master encryption key',
    type: 'Resource Specific'
  }], 
  permissions: {
    inspect: {
      permissions: ["PRIVATE_IP_READ"],
      apis: [getApi('ListPrivateIps'), getApi('getPrivateIp'), 
        getApi('ListPublicIps', 'for ephemeral public IPs only'),
        getApi('GetPublicIpByPrivateIpId', 'for ephemeral public IPs only'),
        getApi('GetPublicIpByIpAddress', 'for ephemeral public IPs only'),
      ]
    },
    read: {
      permissions: [],
      apis: []
    },
    use: {
      permissions: ["PRIVATE_IP_UPDATE", "PRIVATE_IP_ASSIGN", "PRIVATE_IP_UNASSIGN", "PRIVATE_IP_CREATE", "PRIVATE_IP_DELETE", "PRIVATE_IP_ASSIGN_PUBLIC_IP", "PRIVATE_IP_UNASSIGN_PUBLIC_IP"],
      apis: [
        getApi('UpdatePublicIp', 'for ephemeral public IPs only'),
        getApi('CreatePublicIp', 'for ephemeral public IPs only'),
        getApi('DeletePublicIp', 'for ephemeral public IPs only'),
      ],
      partial_apis: [
        getApi('CreatePrivateIp', "also need 'use subnets' and 'use vnics'"),
        getApi('DeletePrivateIp', "also need 'use subnets' and 'use vnics'"),
        getApi('UpdatePrivateIp', "also need 'use vnics'"),
        getApi('UpdatePublicIp', "only for reserved Public IP. Also need 'manage public-ips'"),
        getApi('CreatePublicIp', "only for reserved Public IP. Also need 'manage public-ips'"),
        getApi('DeletePublicIp', "only for reserved Public IP. Also need 'manage public-ips'"),
      ]
    },
    manage: {
      permissions: ["PRIVATE_IP_ROUTE_TABLE_ATTACH", "PRIVATE_IP_ROUTE_TABLE_DETACH"],
      apis: [],
      partial_apis: [
        getApi('CreateRouteTable', "also need 'manage vcns', 'manage internet-gateways', 'manage drgs', 'manage route-tables', 'manage local-peering-gateways', 'use nat-gateways' and 'use service-gateways'"),
        getApi('DeleteRouteTable', "also need 'manage vcns', 'manage internet-gateways', 'manage drgs', 'manage route-tables', 'manage local-peering-gateways', 'use nat-gateways' and 'use service-gateways'"),
        getApi('UpdateRouteTable', "also need 'manage internet-gateways', 'manage drgs', 'manage route-tables', 'manage local-peering-gateways', 'use nat-gateways' and 'use service-gateways'")
      ]
    }
  }
};

details['public-ips'] = {
  type: 'virtual-network-family',
  title: 'public-ips',
  variables: [{
    value: 'target.boot-volume.kms-key.id',
    title: 'Whether compute instances can be launched with boot volumes created without a Vault service master encryption key',
    type: 'Resource Specific'
  }], 
  permissions: {
    inspect: {
      permissions: [],
      apis: []
    },
    read: {
      permissions: ["PUBLIC_IP_READ"],
      apis: [
        getApi('ListPublicIps', 'For reserved public IPs only'),
        getApi('GetPublicIpByPrivateIpId', 'For reserved public IPs only'),
        getApi('GetPublicIpByIpAddress', 'For reserved public IPs only')
      ]
    },
    use: {
      permissions: ["PUBLIC_IP_ASSIGN_PRIVATE_IP", "PUBLIC_IP_UNASSIGN_PRIVATE_IP"],
      apis: [],
      partial_apis: [
        getApi('UpdatePublicIp', "also need 'use private-ips' and 'manage public-ips'"),
        getApi('CreatePublicIp', "also need 'use private-ips' and 'manage public-ips'")
      ]
    },
    manage: {
      permissions: ["PUBLIC_IP_UPDATE", "PUBLIC_IP_CREATE", "PUBLIC_IP_DELETE"],
      apis: [],
      partial_apis: [
        getApi('UpdatePublicIp', "For reserved public Ips. Also need 'use private-ips'")
      ]
    }
  }
};

details['ipv6s'] = {
  type: 'virtual-network-family',
  title: 'ipv6s',
  variables: [{
    value: 'target.boot-volume.kms-key.id',
    title: 'Whether compute instances can be launched with boot volumes created without a Vault service master encryption key',
    type: 'Resource Specific'
  }], 
  permissions: {
    inspect: {
      permissions: [],
      apis: []
    },
    read: {
      permissions: ["IPV6_READ"],
      apis: [
        getApi('GetIpv6')
      ],
      partial_apis: [
        getApi('ListIpv6s', "also need 'inspect vnics' and 'inspect subnets' to list IPv6s by VNIC and subnets'")
      ]
    },
    use: {
      permissions: [],
      apis: []
    },
    manage: {
      permissions: ["IPV6_UPDATE", "IPV6_CREATE", "IPV6_DELETE"],
      apis: [],
      partial_apis: [
        getApi('UpdateIpv6', " Also need 'use vnics'"),
        getApi('CreateIpv6', " Also need 'use vnics' and 'use subnets'"),
        getApi('DeleteIpv6', " Also need 'use vnics' and 'use subnets'")
      ]
    }
  }
};


details['internet-gateways'] = {
  type: 'virtual-network-family',
  title: 'internet-gateways',
  variables: [{
    value: 'target.boot-volume.kms-key.id',
    title: 'Whether compute instances can be launched with boot volumes created without a Vault service master encryption key',
    type: 'Resource Specific'
  }], 
  permissions: {
    inspect: {
      permissions: ["INTERNET_GATEWAY_READ"],
      apis: [getApi('ListInternetGateways'), getApi('GetInternetGateway')]
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
      permissions: ["INTERNET_GATEWAY_ATTACH", "INTERNET_GATEWAY_DETACH", "INTERNET_GATEWAY_UPDATE", "INTERNET_GATEWAY_CREATE", "INTERNET_GATEWAY_DELETE", "INTERNET_GATEWAY_MOVE"],
      apis: [getApi('UpdateInternetGateway'), getApi('ChangeInternetGatewayCompartment')],
      partial_apis: [
        getApi('CreateInternetGateway', "also need 'manage vcns'"),
        getApi('DeleteInternetGateway', "also need 'manage vcns'"),
        getApi('CreateRouteTable', "also need 'manage route-tables', 'manage vcns', 'manage drgs', 'manage private-ips', 'manage local-peering-gateways', 'use nat-gateways' and 'use service-gateways'"),
        getApi('DeleteRouteTable', "also need 'manage route-tables', 'manage vcns', 'manage drgs', 'manage private-ips', 'manage local-peering-gateways', 'use nat-gateways' and 'use service-gateways'"),
        getApi('UpdateRouteTable', "also need 'manage route-tables', 'manage drgs', 'manage private-ips', 'manage local-peering-gateways', 'use nat-gateways' and 'use service-gateways'")
      ]
    }
  }
};

details['nat-gateways'] = {
  type: 'virtual-network-family',
  title: 'nat-gateways',
  variables: [{
    value: 'target.boot-volume.kms-key.id',
    title: 'Whether compute instances can be launched with boot volumes created without a Vault service master encryption key',
    type: 'Resource Specific'
  }], 
  permissions: {
    inspect: {
      permissions: [],
      apis: []
    },
    read: {
      permissions: ["NAT_GATEWAY_READ"],
      apis: [getApi('ListNatGateways'), getApi('GetNatGateway')]
    },
    use: {
      permissions: ["NAT_GATEWAY_ATTACH", "NAT_GATEWAY_DETACH"],
      apis: [],
      partial_apis: [
        getApi('CreateRouteTable', "also need 'manage route-tables', 'manage vcns', 'manage internet-gateways', 'manage drgs', 'manage private-ips', 'manage local-peering-gateways', and 'use service-gateways'"),
        getApi('DeleteRouteTable', "also need 'manage route-tables', 'manage vcns', 'manage internet-gateways', 'manage drgs', 'manage private-ips', 'manage local-peering-gateways', and 'use service-gateways'"),
        getApi('UpdateRouteTable', "also need 'manage route-tables', 'manage internet-gateways', 'manage drgs', 'manage private-ips', 'manage local-peering-gateways', and 'use service-gateways'")
      ]
    },
    manage: {
      permissions: ["NAT_GATEWAY_UPDATE", "NAT_GATEWAY_CREATE", "NAT_GATEWAY_DELETE", "NAT_GATEWAY_MOVE"],
      apis: [getApi('UpdateNatGateway'), getApi('ChangeNatGatewayCompartment')],
      partial_apis: [
        getApi('CreateNatGateway', "also need 'manage vcns'"),
        getApi('DeleteNatGateway', "also need 'manage vcns'")     
      ]
    }
  }
};

details['service-gateways'] = {
  type: 'virtual-network-family',
  title: 'service-gateways',
  variables: [{
    value: 'target.boot-volume.kms-key.id',
    title: 'Whether compute instances can be launched with boot volumes created without a Vault service master encryption key',
    type: 'Resource Specific'
  }], 
  permissions: {
    inspect: {
      permissions: ["SERVICE_GATEWAY_READ"],
      apis: [getApi('ListServiceGateways'), getApi('GetServiceGateway')]
    },
    read: {
      permissions: [],
      apis: []
    },
    use: {
      permissions: ["NAT_GATEWAY_ATTACH", "NAT_GATEWAY_DETACH"],
      apis: [],
      partial_apis: [
        getApi('CreateRouteTable', "also need 'manage route-tables', 'manage vcns', 'manage internet-gateways', 'manage drgs', 'manage private-ips', 'manage local-peering-gateways', and 'use service-gateways'"),
        getApi('DeleteRouteTable', "also need 'manage route-tables', 'manage vcns', 'manage internet-gateways', 'manage drgs', 'manage private-ips', 'manage local-peering-gateways', and 'use service-gateways'"),
        getApi('UpdateRouteTable', "also need 'manage route-tables', 'manage internet-gateways', 'manage drgs', 'manage private-ips', 'manage local-peering-gateways', and 'use service-gateways'")
      ]
    },
    manage: {
      permissions: ["SERVICE_GATEWAY_UPDATE", "SERVICE_GATEWAY_CREATE", "SERVICE_GATEWAY_DELETE", "SERVICE_GATEWAY_MOVE", "SERVICE_GATEWAY_ADD_SERVICE", "SERVICE_GATEWAY_DELETE_SERVICE"],
      apis: [getApi('AttachServiceId'), getApi('DetachServiceId'), getApi('ChangeServiceGatewayCompartment')],
      partial_apis: [
        getApi('CreateServiceGateway', "also need 'manage vcns' and 'manage route-tables' if you associate a route table during creation"),
        getApi('DeleteServiceGateway', "also need 'manage vcns'"),
        getApi('UpdateServiceGateway', "also need 'manage route-tables' if you associate a route table during the update"),
      ]
    }
  }
};

details['local-peering-gateways'] = {
  type: 'virtual-network-family',
  title: 'local-peering-gateways',
  variables: [{
    value: 'target.boot-volume.kms-key.id',
    title: 'Whether compute instances can be launched with boot volumes created without a Vault service master encryption key',
    type: 'Resource Specific'
  }], 
  permissions: {
    inspect: {
      permissions: ["LOCAL_PEERING_GATEWAY_READ"],
      apis: [getApi('ListLocalPeeringGateways'), getApi('GetLocalPeeringGateway')]
    },
    read: {
      permissions: [],
      apis: []
    },
    use: {
      permissions: [],
      apis: [],
      partial_apis: []
    },
    manage: {
      permissions: ["LOCAL_PEERING_GATEWAY_UPDATE", "LOCAL_PEERING_GATEWAY_CREATE", "LOCAL_PEERING_GATEWAY_DELETE", "LOCAL_PEERING_GATEWAY_MOVE", "LOCAL_PEERING_GATEWAY_ATTACT", "LOCAL_PEERING_GATEWAY_DETACH"],
      apis: [],
      partial_apis: [
        getApi('CreateLocalPeeringGateway', "also need 'manage vcns' and 'manage route-tables' if you associate a route table during creation"),
        getApi('DeleteServiceGateway', "also need 'manage vcns'"),
        getApi('UpdateLocalPeeringGateway', "also need 'manage route-tables' if you associate a route table during the update"),
        getApi('CreateRouteTable', "also need 'manage route-tables', 'manage vcns', 'manage internet-gateways', 'manage drgs', 'manage private-ips', 'manage local-peering-gateways', and 'use service-gateways'"),
        getApi('DeleteRouteTable', "also need 'manage route-tables', 'manage vcns', 'manage internet-gateways', 'manage drgs', 'manage private-ips', 'manage local-peering-gateways', and 'use service-gateways'"),
        getApi('UpdateRouteTable', "also need 'manage route-tables', 'manage internet-gateways', 'manage drgs', 'manage private-ips', 'manage local-peering-gateways', and 'use service-gateways'"),
        getApi('ChangeLocalPeeringGatewayCompartment')
      ]
    }
  }
};

details['local-peering-from'] = {
  type: 'virtual-network-family',
  title: 'local-peering-from',
  variables: [{
    value: 'target.boot-volume.kms-key.id',
    title: 'Whether compute instances can be launched with boot volumes created without a Vault service master encryption key',
    type: 'Resource Specific'
  }], 
  permissions: {
    inspect: {
      permissions: ["LOCAL_PEERING_GATEWAY_READ"],
      apis: []
    },
    read: {
      permissions: [],
      apis: []
    },
    use: {
      permissions: [],
      apis: [],
      partial_apis: []
    },
    manage: {
      permissions: ["LOCAL_PEERING_GATEWAY_CONNECT_FROM"],
      apis: [],
      partial_apis: [
        getApi('ConnectLocalPeeringGateways', "acceptor in the peering relationship must also grant the requestor 'manage local-peering-to' in the compartment where the acceptor's LPG reside")
      ]
    }
  }
};

details['local-peering-to'] = {
  type: 'virtual-network-family',
  title: 'local-peering-to',
  variables: [{
    value: 'target.boot-volume.kms-key.id',
    title: 'Whether compute instances can be launched with boot volumes created without a Vault service master encryption key',
    type: 'Resource Specific'
  }], 
  permissions: {
    inspect: {
      permissions: ["LOCAL_PEERING_GATEWAY_READ"],
      apis: []
    },
    read: {
      permissions: [],
      apis: []
    },
    use: {
      permissions: [],
      apis: [],
      partial_apis: []
    },
    manage: {
      permissions: ["LOCAL_PEERING_GATEWAY_CONNECT_TO"],
      apis: [],
      partial_apis: [
        getApi('ConnectLocalPeeringGateways', "requester in the peering relationship must also grant the requestor 'manage local-peering-from' in the compartment where the acceptor's LPG reside")
      ]
    }
  }
};

details['remote-peering-connections'] = {
  type: 'virtual-network-family',
  title: 'remote-peering-connections',
  variables: [{
    value: 'target.boot-volume.kms-key.id',
    title: 'Whether compute instances can be launched with boot volumes created without a Vault service master encryption key',
    type: 'Resource Specific'
  }], 
  permissions: {
    inspect: {
      permissions: ["REMOTE_PEERING_CONNECTION_READ"],
      apis: [getApi('ListRemotePeeringConnections'), getApi('GetRemotePeeringConnection')]
    },
    read: {
      permissions: [],
      apis: []
    },
    use: {
      permissions: [],
      apis: [],
      partial_apis: []
    },
    manage: {
      permissions: ["REMOTE_PEERING_CONNECTION_UPDATE", "REMOTE_PEERING_CONNECTION_CREATE", "REMOTE_PEERING_CONNECTION_DELETE", "REMOTE_PEERING_CONNECTION_MOVE", "REMOTE_PEERING_CONNECTION_ATTACT", "REMOTE_PEERING_CONNECTION_DETACH"],
      apis: [getApi('UpdateRemotePeeringConnection')],
      partial_apis: [
        getApi('CreateRemotePeeringConnection', "also need 'manage drgs'"),
        getApi('DeleteRemotePeeringConnection', "also need 'manage drgs'"),
        getApi('ChangeRemotePeeringConnectionCompartment')
      ]
    }
  }
};

details['remote-peering-from'] = {
  type: 'virtual-network-family',
  title: 'remote-peering-from',
  variables: [{
    value: 'target.boot-volume.kms-key.id',
    title: 'Whether compute instances can be launched with boot volumes created without a Vault service master encryption key',
    type: 'Resource Specific'
  }], 
  permissions: {
    inspect: {
      permissions: ["REMOTE_PEERING_CONNECTION_READ"],
      apis: []
    },
    read: {
      permissions: [],
      apis: []
    },
    use: {
      permissions: [],
      apis: [],
      partial_apis: []
    },
    manage: {
      permissions: ["REMOTE_PEERING_CONNECTION_CONNECT_FROM"],
      apis: [],
      partial_apis: [
        getApi('ConnectRemotePeeringConnections', "acceptor in the peering relationship must also grant the requestor 'manage remote-peering-to' in the compartment where the acceptor's LPG reside")
      ]
    }
  }
};

details['remote-peering-to'] = {
  type: 'virtual-network-family',
  title: 'remote-peering-to',
  variables: [{
    value: 'target.boot-volume.kms-key.id',
    title: 'Whether compute instances can be launched with boot volumes created without a Vault service master encryption key',
    type: 'Resource Specific'
  }], 
  permissions: {
    inspect: {
      permissions: ["REMOTE_PEERING_CONNECTION_READ"],
      apis: []
    },
    read: {
      permissions: [],
      apis: []
    },
    use: {
      permissions: [],
      apis: [],
      partial_apis: []
    },
    manage: {
      permissions: ["REMOTE_PEERING_CONNECTION_CONNECT_TO"],
      apis: [],
      partial_apis: [
        getApi('ConnectRemotePeeringConnections', "requester in the peering relationship must also grant the requestor 'manage remote-peering-to' in the compartment where the acceptor's LPG reside")
      ]
    }
  }
};

details['drgs'] = {
  type: 'virtual-network-family',
  title: 'drgs',
  variables: [{
    value: 'target.boot-volume.kms-key.id',
    title: 'Whether compute instances can be launched with boot volumes created without a Vault service master encryption key',
    type: 'Resource Specific'
  }], 
  permissions: {
    inspect: {
      permissions: ["DRG_READ", "DRG_ATTACHMENT_READ"],
      apis: [getApi('ListDrgs'), getApi('GetDrg'), getApi('ListDrgAttachments')]
    },
    read: {
      permissions: [],
      apis: []
    },
    use: {
      permissions: [],
      apis: [],
      partial_apis: []
    },
    manage: {
      permissions: ["DRG_ATTACH", "DRG_DETACH", "DRG_UPDATE", "DRG_ATTACHMENT_UPDATE", "DRG_CREATE", "DRG_DELETE", "DRG_MOVE"],
      apis: [getApi('CreateDrg'), getApi('UpdateDrg'), getApi('DeleteDrg'), getApi('ChangeDrgCompartment')],
      partial_apis: [
        getApi('CreateDrgAttachment', "also need 'manage vcns' and 'manage route-tables' if you associate a route table during creation"),
        getApi('UpdateDrgAttachment', "also need 'manage route-tables' if you associate a route table during update"),
        getApi('DeleteDrgAttachmebt', "also need 'manage vcns'"),
        getApi('CreateRouteTable', "also need 'manage route-tables', 'manage vcns', 'manage internet-gateways', 'manage private-ips', 'manage local-peering-gateways', 'use nat-gateways' and 'use service-gateways'"),
        getApi('DeleteRouteTable', "also need 'manage route-tables', 'manage vcns', 'manage internet-gateways', 'manage private-ips', 'manage local-peering-gateways', 'use nat-gateways' and 'use service-gateways'"),
        getApi('UpdateRouteTable', "also need 'manage route-tables', 'manage internet-gateways', 'use nat-gateways', 'manage private-ips', 'manage local-peering-gateways', and 'use service-gateways'"),
        getApi('UpdateVirtualCircuit', "also need 'use virtual-circuits' and if you're also changing which cross connect or cross-connect group the virtual circuit uses, also need 'manage cross-connects'"),
        getApi('CreateVirtualCircuit', "also need 'use virtual-circuits' and if you're also adding which cross connect or cross-connect group the virtual circuit uses, also need 'manage cross-connects'"),
        getApi('DeleteVirtualCircuit', "also need 'use virtual-circuits' and if you're also removing which cross connect or cross-connect group the virtual circuit uses, also need 'manage cross-connects'"),
        getApi('CreateRemotePeeringConnection', "also need 'manage remote-peering-connections'"),
        getApi('DeleteRemotePeeringConnection', "also need 'manage remote-peering-connections'")
      ]
    }
  }
};

details['cpes'] = {
  type: 'virtual-network-family',
  title: 'cpes',
  variables: [{
    value: 'target.boot-volume.kms-key.id',
    title: 'Whether compute instances can be launched with boot volumes created without a Vault service master encryption key',
    type: 'Resource Specific'
  }], 
  permissions: {
    inspect: {
      permissions: ["CPE_READ"],
      apis: [getApi('ListCpes'), getApi('GetCpe')]
    },
    read: {
      permissions: [],
      apis: []
    },
    use: {
      permissions: [],
      apis: [],
      partial_apis: []
    },
    manage: {
      permissions: ["CPE_ATTACH", "CPE_DETACH", "CPE_UPDATE", "CPE_CREATE", "CPE_DELETE", "CPE_MOVE", "CPE_RESOURCE_MOVE"],
      apis: [getApi('CreateCpe'), getApi('UpdateCpe'), getApi('DeleteCpe'), getApi('ChangeDrgCompartment')],
      partial_apis: [
        getApi('CreateIPSecConnection', "also need 'manage ipsec-connections' and 'manage drgs'"),
        getApi('DeleteIPSecConnection', "also need 'manage ipsec-connections' and 'manage drgs'")
      ]
    }
  }
};

details['ipsec'] = {
  type: 'virtual-network-family',
  title: 'ipsec',
  variables: [{
    value: 'target.boot-volume.kms-key.id',
    title: 'Whether compute instances can be launched with boot volumes created without a Vault service master encryption key',
    type: 'Resource Specific'
  }], 
  permissions: {
    inspect: {
      permissions: ["IPSEC_CONNECTION_READ"],
      apis: [getApi('ListIPSecConnections'), getApi('GetIPSecConnection'), getApi('GetIPSecConnectionStatus'), getApi('ListIPSecConnectionTunnels'), getApi('GetIPSecConnectionTunnel'), getApi('GetTunnelCpeDeviceConfig'), getApi('GetTunnelCpeDeviceTemplateContent'), getApi('GetCpeDeviceTemplateContent'), getApi('GetIpsecCpeDeviceTemplateContent')]
    },
    read: {
      permissions: ["IPSEC_CONNECTION_DEVICE_CONFIG_READ"],
      apis: [getApi('GetIpSecConnectionDeviceConfig'), getApi('GetIpSecConnectionTunnelSharedSecret')]
    },
    use: {
      permissions: [],
      apis: [],
      partial_apis: []
    },
    manage: {
      permissions: ["IPSEC_CONNECTION_CREATE", "IPSEC_CONNECTION_UPDATE", "IPSEC_CONNECTION_DELETE", "IPSEC_CONNECTION_DEVICE_CONFIG_UPDATE"],
      apis: [getApi('UpdateIPSecConnection'), getApi('UpdateTunnelCPEDeviceConfig'), getApi('UpdateIPSecConnectionTunnel')],
      partial_apis: [
        getApi('CreateIPSecConnection', "also need 'manage cpes' and 'manage drgs'"),
        getApi('DeleteIPSecConnection', "also need 'manage cpes' and 'manage drgs'")
      ]
    }
  }
};

details['cross-connects'] = {
  type: 'virtual-network-family',
  title: 'cross-connects',
  variables: [{
    value: 'target.boot-volume.kms-key.id',
    title: 'Whether compute instances can be launched with boot volumes created without a Vault service master encryption key',
    type: 'Resource Specific'
  }], 
  permissions: {
    inspect: {
      permissions: ["CROSS_CONNECT_READ"],
      apis: [getApi('ListCrossConnects'), getApi('GetCrossConnect')]
    },
    read: {
      permissions: [],
      apis: []
    },
    use: {
      permissions: [],
      apis: [],
      partial_apis: []
    },
    manage: {
      permissions: ["CROSS_CONNECT_UPDATE", "CROSS_CONNECT_CREATE", "CROSS_CONNECT_DELETE", "CROSS_CONNECT_RESOURCE_MOVE", "CROSS_CONNECT_ATTACH", "CROSS_CONNECT_DETACH"],
      apis: [getApi('UpdateCrossConnect'), getApi('CreateCrossConnect'), getApi('DeleteCrossConnect'), getApi('ChangeCrossConnectCompartment')],
      partial_apis: [
        getApi('UpdateVirtualCircuit', "also need 'use virtual-circuits'"),
        getApi('CreateVirtualCircuit', "also need 'manage virtual-circuits'"),
        getApi('DeleteVirtualCircuit', "also need 'manage virtual-circuits'")
      ]
    }
  }
};
details['cross-connect-groups'] = {
  type: 'virtual-network-family',
  title: 'cross-connect-groups',
  variables: [{
    value: 'target.boot-volume.kms-key.id',
    title: 'Whether compute instances can be launched with boot volumes created without a Vault service master encryption key',
    type: 'Resource Specific'
  }], 
  permissions: {
    inspect: {
      permissions: ["CROSS_CONNECT_GROUP_READ"],
      apis: [getApi('ListCrossConnectGroups'), getApi('GetCrossConnectGroup')]
    },
    read: {
      permissions: [],
      apis: []
    },
    use: {
      permissions: [],
      apis: [],
      partial_apis: []
    },
    manage: {
      permissions: ["CROSS_CONNECT_GROUP_UPDATE", "CROSS_CONNECT_GROUP_CREATE", "CROSS_CONNECT_GROUP_DELETE", "CROSS_CONNECT_GROUP_RESOURCE_MOVE"],
      apis: [getApi('UpdateCrossConnectGroup'), getApi('CreateCrossConnectGroup'), getApi('DeleteCrossConnectGroup'), getApi('ChangeCrossConnectGroupCompartment')],
      partial_apis: []
    }
  }
};

details['virtual-circuits'] = {
  type: 'virtual-network-family',
  title: 'virtual-circuits',
  variables: [{
    value: 'target.boot-volume.kms-key.id',
    title: 'Whether compute instances can be launched with boot volumes created without a Vault service master encryption key',
    type: 'Resource Specific'
  }], 
  permissions: {
    inspect: {
      permissions: ["VIRTUAL_CIRCUIT_READ"],
      apis: [getApi('ListVirtualCircuits'), getApi('GetVirtualCircuit')]
    },
    read: {
      permissions: [],
      apis: []
    },
    use: {
      permissions: [],
      apis: [],
      partial_apis: []
    },
    manage: {
      permissions: ["VIRTUAL_CIRCUIT_UPDATE"],
      apis: [],
      partial_apis: [getApi('UpdateVirtualCircuit', "also need 'manage drgs', and if you're also changing which cross-connect or cross-connect group the virtual circuit uses also need 'manage cross-connects')")]
    }
  }
};

details['vnics'] = {
  type: 'virtual-network-family',
  title: 'vnics',
  variables: [{
    value: 'target.boot-volume.kms-key.id',
    title: 'Whether compute instances can be launched with boot volumes created without a Vault service master encryption key',
    type: 'Resource Specific'
  }], 
  permissions: {
    inspect: {
      permissions: ["VNIC_READ"],
      apis: [getApi('GetVnic')],
      partial_apis: [getApi('CreateInstanceConfiguration', "if using the CreateInstanceConfigurationFromInstanceDetails subtype. Also need 'read instances', 'inspect vnic-attachments', 'inspect volumes', and 'inspect volume-attachments.'")]
    },
    read: {
      permissions: [],
      apis: []
    },
    use: {
      permissions: ["VNIC_ATTACH", "VNIC_DETACH", "VNIC_CREATE", "VNIC_DELETE", "VNIC_UPDATE", "VNIC_ASSOCIATE_NETWORK_SECURITY_GROUP", "VNIC_DISASSOCIATE_NETWORK_SECURITY_GROUP"],
      apis: [],
      partial_apis: [
        getApi('LaunchInstance', "also need 'use subnets', 'use network-security-groups', and 'manage instance-family'"),
        getApi('AttachVnic', "also need 'manage instances', 'use subnets', and 'use network-security-groups'"),
        getApi('UpdateVnic', "also need 'use network-security-groups'"),
        getApi('DetachVnic', "also need 'manage instances', and 'use subnets'"),
        getApi('CreatePrivateIp', "also need 'use subnets', and 'use private-ips'"),
        getApi('DeletePrivateIp', "also need 'use subnets', and 'use private-ips'")
      ]
    },
    manage: {
      permissions: [],
      apis: []
    }
  }
};


details['vnics-attachments'] = {
  type: 'virtual-network-family',
  title: 'vnics-attachments',
  variables: [{
    value: 'target.boot-volume.kms-key.id',
    title: 'Whether compute instances can be launched with boot volumes created without a Vault service master encryption key',
    type: 'Resource Specific'
  }], 
  permissions: {
    inspect: {
      permissions: ["VNIC_ATTACHMENT_READ"],
      apis: [getApi('GetVnicAttachment')],
      partial_apis: [
        getApi('ListVnicAttachments', "also need 'inspect instances'"),
        getApi('CreateInstanceConfiguration', "if using the CreateInstanceConfigurationFromInstanceDetails subtype. Also need 'read instances', 'inspect vnic-attachments', 'inspect volumes', and 'inspect volume-attachments.'")
      ]
    },
    read: {
      permissions: [],
      apis: []
    },
    use: {
      permissions: [],
      apis: [],
    },
    manage: {
      permissions: [],
      apis: []
    }
  }
};




export default details;