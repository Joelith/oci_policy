import cluster_family from './data/cluster-family';
import compute_management_family from './data/compute-management-family';
import data_catalog_family from './data/data-catalog-family';
import database_family from './data/database-family';
import autonomous_database_family from './data/autonomous-database-family';
import dns from './data/dns';
import file_family from './data/file-family';
import instance_family from './data/instance-family';
import iam_family from './data/iam-family';
import object_family from './data/object-family';
import virtual_network_family from './data/virtual-network-family';
import volume_family from './data/volume-family';
import additional_compute_family from './data/additional-compute-family';

let data = {};
const clean = (info) => {
  info.permissions.read.permissions = info.permissions.inspect.permissions.concat(info.permissions.read.permissions);
  info.permissions.read.apis = info.permissions.inspect.apis.concat(info.permissions.read.apis);
  info.permissions.read.partial_apis = (info.permissions.inspect.partial_apis || []).concat(info.permissions.read.partial_apis || []);

  info.permissions.use.permissions = info.permissions.read.permissions.concat(info.permissions.use.permissions);
  info.permissions.use.apis = info.permissions.read.apis.concat(info.permissions.use.apis);
  info.permissions.use.partial_apis = (info.permissions.read.partial_apis || []).concat(info.permissions.use.partial_apis || []);

  info.permissions.manage.permissions = info.permissions.use.permissions.concat(info.permissions.manage.permissions);
  info.permissions.manage.apis = info.permissions.use.apis.concat(info.permissions.manage.apis);
  info.permissions.manage.partial_apis = (info.permissions.use.partial_apis || []).concat(info.permissions.manage.partial_apis || []);

  if (info.type === info.title) return info; // We are in the root family already
  if (info.type === 'iam-family') return info; // IAM family doesn't exist as a useable resource type
  if (!data[info.type]) data[info.type] = {
    type: info.type,
    title: info.type,
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
  data[info.type].permissions.inspect.permissions = data[info.type].permissions.inspect.permissions.concat(info.permissions.inspect.permissions);
  data[info.type].permissions.inspect.apis = data[info.type].permissions.inspect.apis.concat(info.permissions.inspect.apis);

  data[info.type].permissions.read.permissions = data[info.type].permissions.read.permissions.concat(info.permissions.read.permissions);
  data[info.type].permissions.read.apis = data[info.type].permissions.read.apis.concat(info.permissions.read.apis);

  data[info.type].permissions.use.permissions = data[info.type].permissions.use.permissions.concat(info.permissions.use.permissions);
  data[info.type].permissions.use.apis = data[info.type].permissions.use.apis.concat(info.permissions.use.apis);

  data[info.type].permissions.manage.permissions = data[info.type].permissions.manage.permissions.concat(info.permissions.manage.permissions);
  data[info.type].permissions.manage.apis = data[info.type].permissions.manage.apis.concat(info.permissions.manage.apis);
  data[info.type].permissions.manage.partial_apis = data[info.type].permissions.manage.partial_apis.concat(info.permissions.manage.partial_apis || []);

  return info;
}

const buildAll = () => {
  const _families = data.filter((item) => {
    if (item.type == item.title) return item;
  });
  let variables = [];
  let inspect = {
    apis: [],
    permissions: []
  };
  let read = {
    apis: [],
    permissions: []
  };
  let use = {
    apis: [],
    permissions: []
  };
  let manage = {
    apis: [],
    permissions: []
  };
  _families.map((fam) => {
    inspect.apis = inspect.apis.concat(fam.permissions.inspect.apis);
    inspect.permissions = inspect.permissions.concat(fam.permissions.inspect.permissions);

    read.apis = read.apis.concat(fam.permissions.read.apis);
    read.permissions = read.permissions.concat(fam.permissions.read.permissions);

    use.apis = use.apis.concat(fam.permissions.use.apis);
    use.permissions = use.permissions.concat(fam.permissions.use.permissions);

    manage.apis = manage.apis.concat(fam.permissions.manage.apis);
    manage.permissions = manage.permissions.concat(fam.permissions.manage.permissions);

  });

  return {
    title: 'all-resources',
    variables: variables,
    permissions: {
      inspect: inspect,
      read: read,
      use: use,
      manage: manage
    }
  }
}

data = { ...data, ...cluster_family};
Object.values(cluster_family).map((item) => {
  clean(item);
});
data = { ...data, ...compute_management_family};
Object.values(compute_management_family).map((item) => {
  clean(item);
});
data = { ...data, ...additional_compute_family};
Object.values(additional_compute_family).map((item) => {
  clean(item);
});
data = { ...data, ...data_catalog_family};
Object.values(data_catalog_family).map((item) => {
  clean(item);
});
data = { ...data, ...database_family};
Object.values(database_family).map((item) => {
  clean(item);
});
data = { ...data, ...autonomous_database_family};
Object.values(autonomous_database_family).map((item) => {
  clean(item);
});
data = { ...data, ...dns};
Object.values(dns).map((item) => {
  clean(item);
});
data = { ...data, ...file_family};
Object.values(file_family).map((item) => {
  clean(item);
});
data = { ...data, ...instance_family};
Object.values(instance_family).map((item) => {
  clean(item);
});
data = { ...data, ...iam_family};
Object.values(iam_family).map((item) => {
  clean(item);
});
data = { ...data, ...object_family};
Object.values(object_family).map((item) => {
  clean(item);
});
data = { ...data, ...virtual_network_family};
Object.values(virtual_network_family).map((item) => {
  clean(item);
});
data = { ...data, ...volume_family};
Object.values(volume_family).map((item) => {
  clean(item);
});

data = Object.values(data);
data.unshift(buildAll());

export default data;
