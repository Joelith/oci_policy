import getApi from './api';

const details = {};

details['data-catalog-family'] = {
  type: 'data-catalog-family',
  title: 'data-catalog-family',
  variables: [{
    value: 'target.catalog.id',
    title: 'The Catalog OCID',
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

details['data-catalogs'] = {
  type: 'data-catalog-family',
  title: 'data-catalogs',
  variables: [{
    value: 'target.catalog.id',
    title: 'The Catalog OCID',
    type: 'Resource Specific'
  }],
  permissions: {
    inspect: {
      permissions: ["CATALOG_INSPECT", "CATALOG_JOB_DEFINITION_INSPECT", "CATALOG_JOB_INSPECT", "CATALOG_WORK_REQUEST_INSPECT"],
      apis: [getApi('ListCatalogs'), getApi('ListJobDefinitions'), getApi('ListJobs'), getApi('ListWorkRequests')]
    },
    read: {
      permissions: ["CATALOG_JOB_DEFINITION_READ", "CATALOG_JOB_READ", "CATALOG_READ", "CATALOG_WORK_REQUEST_READ"],
      apis: [getApi('GetJobDefinition'), getApi('ListJobDefinitionPermissions'), getApi('GetJob'), getApi('GetLobLog'), getApi('GetJobMetrics'), getApi('ListJobExecutions'), getApi('ListJobLogs'), getApi('ListJobMetrics'), getApi('GetCatalog'), getApi('GetType'), getApi('ListCatalogPermissions'), getApi('ListDataAssetPermissions'), getApi('ListGlossaries'), getApi('ListTypes'), getApi('ListSearchResults'), getApi('GetWorkRequest'), getApi('ListWorkRequestErrors'), getApi('ListWorkRequestLogs')]
    },
    use: {
      permissions: ["CATALOG_UPDATE", "CATALOG_JOB_DEFINITION_CREATE", "CATALOG_JOB_DEFINITION_UPDATE", "CATALOG_JOB_DEFINITION_DELETE", "CATALOG_JOB_CREATE", "CATALOG_JOB_UPDATE", "CATALOG_JOB_DELETE"],
      apis: [getApi('UpdateCatalog'), getApi('CreateJobDefinition'), getApi('UpdateJobDefinition'), getApi('DeleteJobDefinition'), getApi('CreateJob'), getApi('UpdateJob'), getApi('DeleteJob')]
    },
    manage: {
      permissions: ["CATALOG_CREATE", "CATALOG_DELETE", "CATALOG_MOVE"],
      apis: [getApi('CreateCatalog'), getApi('DeleteCatalog'), getApi('ChangeCatalogCompartment')],
      partial_apis: []
    }
  }
}

details['data-catalogs'] = {
  type: 'data-catalog-family',
  title: 'data-catalog-data-assets',
  variables: [{
    value: 'target.catalog.id',
    title: 'The Catalog OCID',
    type: 'Resource Specific'
  },{
    value: 'target.data-asset.key',
    title: 'The UUID for the data asset (not the OCID)'
  }],
  permissions: {
    inspect: {
      permissions: ["CATALOG_DATA_ASSET_INSPECT", "CATALOG_DATA_ASSET_TAG_INSPECT"],
      apis: [getApi('ListDataAssets'), getApi('ListFolders'), getApi('ListAttributeTags'), getApi('ListDataAssetTags'), getApi('ListEntityTags'), getApi('ListFolderTags')]
    },
    read: {
      permissions: ["CATALOG_DATA_ASSET_READ", "CATALOG_DATA_ASSET_TAG_READ",],
      apis: [getApi('GetAttribute'), getApi('GetConnection'), getApi('GetDataAsset'), getApi('GetEntity'), getApi('GetFolder'), getApi('ListAttributes'), getApi('ListConnections'), getApi('ListEntities'), getApi('ListFolders'), getApi('ParseConnection'), getApi('GetAttributeTag'), getApi('GetDataAssetTag'), getApi('GetEntityTag'), getApi('GetFolderTag')]
    },
    use: {
      permissions: ["CATALOG_DATA_ASSET_UPDATE", "CATALOG_DATA_ASSET_TAG_CREATE", "CATALOG_DATA_ASSET_TAG_DELETE", "CATALOG_DATA_ASSET_TAG_UPDATE"],
      apis: [getApi('CreateAttribute'), getApi('CreateConnection'), getApi('CreateEntity'), getApi('CreateFolder'), getApi('DeleteAttribute'), getApi('DeleteConnection'), getApi('DeleteEntity'), getApi('DeleteFolder'), getApi('ImportConnection'), getApi('TestConnection'), getApi('UpdateAttribute'), getApi('UpdateConnection'), getApi('UpdateDataAsset'), getApi('UpdateEntity'), getApi('UpdateFolder'), getApi('ValidateConnection'), getApi('CreateAttributeTag'), getApi('CreateDataAssetTag'), getApi('CreateEntityTag'), getApi('CreateFolderTag'), getApi('DeleteDataAssetTag'), getApi('DeleteAttributeTag'), getApi('DeleteEntityTag'), getApi('DeleteFolderTag')]
    },
    manage: {
      permissions: ["CATALOG_DATA_ASSET_CREATE", "CATALOG_DATA_ASSET_DELETE"],
      apis: [getApi('CreateDataAsset'), getApi('DeleteDataAsset')],
      partial_apis: []
    }
  }
}

details['data-catalogs'] = {
  type: 'data-catalog-family',
  title: 'data-catalog-glossaries',
  variables: [{
    value: 'target.catalog.id',
    title: 'The Catalog OCID',
    type: 'Resource Specific'
  },{
    value: 'target.glossary.key',
    title: 'The UUID for the data glossary (not the OCID)'
  }],
  permissions: {
    inspect: {
      permissions: ["CATALOG_GLOSSARY_INSPECT"],
      apis: [getApi('ListGlossaries')]
    },
    read: {
      permissions: ["CATALOG_GLOSSARY_READ"],
      apis: [getApi('ExpandTreeForGlossary'), getApi('ExportGlossary'), getApi('GetGlossary'), getApi('GetTerm'), getApi('GetTermRelationship'), getApi('ListGlossaryTermRelationships'), getApi('ListGlossaryTerms')]
    },
    use: {
      permissions: ["CATALOG_GLOSSARY_UPDATE"],
      apis: [getApi('CreateTerm'), getApi('CreateTermRelationship'), getApi('UpdateTerm'), getApi('DeleteTerm'), getApi('UpdateTermRelationship'), getApi('DeleteTermRelationship'), getApi('UpdateGlossary'), getApi('ImportGlossary')]
    },
    manage: {
      permissions: ["CATALOG_GLOSSARY_CREATE", "CATALOG_GLOSSARY_DELETE"],
      apis: [getApi('CreateGlossary'), getApi('DeleteGlossary')],
      partial_apis: []
    }
  }
}

export default details;
