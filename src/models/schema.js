export const schema = {
    "models": {
        "UserStores": {
            "name": "UserStores",
            "fields": {
                "user_id": {
                    "name": "user_id",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "timestamp": {
                    "name": "timestamp",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": true,
                    "attributes": []
                },
                "store_name": {
                    "name": "store_name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "store_url": {
                    "name": "store_url",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "products": {
                    "name": "products",
                    "isArray": true,
                    "type": {
                        "nonModel": "Product"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": false
                }
            },
            "syncable": true,
            "pluralName": "UserStores",
            "attributes": [
                {
                    "type": "model",
                    "properties": {
                        "timestamps": null
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "fields": [
                            "user_id",
                            "timestamp"
                        ]
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "UserStoreProducts",
                        "queryField": "getUserStoreProducts",
                        "fields": [
                            "store_name"
                        ]
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "operations": [
                                    "read"
                                ],
                                "provider": "iam"
                            },
                            {
                                "allow": "private",
                                "operations": [
                                    "create"
                                ],
                                "provider": "iam"
                            },
                            {
                                "allow": "private",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ],
                                "provider": "userPools"
                            }
                        ]
                    }
                }
            ]
        },
        "ProductBlogs": {
            "name": "ProductBlogs",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "content": {
                    "name": "content",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "user_id": {
                    "name": "user_id",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "metadata": {
                    "name": "metadata",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "store_name": {
                    "name": "store_name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "store_url": {
                    "name": "store_url",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "products": {
                    "name": "products",
                    "isArray": true,
                    "type": {
                        "nonModel": "Product"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": false
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "ProductBlogs",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "UserProductsBlogs",
                        "queryField": "getUserProductsBlogs",
                        "fields": [
                            "user_id"
                        ]
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "operations": [
                                    "read"
                                ],
                                "provider": "iam"
                            },
                            {
                                "allow": "private",
                                "operations": [
                                    "create"
                                ],
                                "provider": "iam"
                            },
                            {
                                "allow": "private",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ],
                                "provider": "userPools"
                            }
                        ]
                    }
                }
            ]
        }
    },
    "enums": {},
    "nonModels": {
        "Product": {
            "name": "Product",
            "fields": {
                "product_id": {
                    "name": "product_id",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "title": {
                    "name": "title",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "handle": {
                    "name": "handle",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "body_html": {
                    "name": "body_html",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "images": {
                    "name": "images",
                    "isArray": true,
                    "type": {
                        "nonModel": "ProductImage"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": false
                }
            }
        },
        "ProductImage": {
            "name": "ProductImage",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "width": {
                    "name": "width",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "height": {
                    "name": "height",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "src": {
                    "name": "src",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                }
            }
        }
    },
    "codegenVersion": "3.4.4",
    "version": "f27873e700e9c83232902775431a0968"
};