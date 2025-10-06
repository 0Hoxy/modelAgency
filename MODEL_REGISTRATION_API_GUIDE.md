{
"openapi": "3.1.0",
"info": {
"title": "모델 에이전시 API",
"description": "모델 에이전시 백엔드 API",
"version": "1.0.0"
},
"paths": {
"/models/domestic/revisit-verification": {
"post": {
"tags": [
"models"
],
"summary": "Verify Domestic Revisit",
"description": "국내 모델 재방문 확인",
"operationId": "verify_domestic_revisit_models_domestic_revisit_verification_post",
"requestBody": {
"content": {
"application/json": {
"schema": {
"$ref": "#/components/schemas/ReadRevisitedModel"
}
}
},
"required": true
},
"responses": {
"200": {
"description": "Successful Response",
"content": {
"application/json": {
"schema": {

                }
              }
            }
          },
          "404": {
            "description": "Not found"
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/models/global/revisit-verification": {
      "post": {
        "tags": [
          "models"
        ],
        "summary": "Verify Global Revisit",
        "description": "해외 모델 재방문 확인",
        "operationId": "verify_global_revisit_models_global_revisit_verification_post",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ReadRevisitedModel"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {

                }
              }
            }
          },
          "404": {
            "description": "Not found"
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/models/domestic": {
      "get": {
        "tags": [
          "models"
        ],
        "summary": "Read Domestic",
        "description": "국내 모델 목록 조회",
        "operationId": "read_domestic_models_domestic_get",
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {

                }
              }
            }
          },
          "404": {
            "description": "Not found"
          }
        }
      },
      "put": {
        "tags": [
          "models"
        ],
        "summary": "Update Domestic",
        "description": "국내 모델 정보 수정",
        "operationId": "update_domestic_models_domestic_put",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateDomesticModel"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {

                }
              }
            }
          },
          "404": {
            "description": "Not found"
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "models"
        ],
        "summary": "Create Domestic",
        "description": "국내 모델 등록",
        "operationId": "create_domestic_models_domestic_post",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateDomesticModel"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {

                }
              }
            }
          },
          "404": {
            "description": "Not found"
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/models/global": {
      "get": {
        "tags": [
          "models"
        ],
        "summary": "Read Global",
        "description": "해외 모델 목록 조회",
        "operationId": "read_global_models_global_get",
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {

                }
              }
            }
          },
          "404": {
            "description": "Not found"
          }
        }
      },
      "put": {
        "tags": [
          "models"
        ],
        "summary": "Update Global",
        "description": "해외 모델 정보 수정",
        "operationId": "update_global_models_global_put",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateGlobalModel"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {

                }
              }
            }
          },
          "404": {
            "description": "Not found"
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "models"
        ],
        "summary": "Create Global",
        "description": "해외 모델 등록",
        "operationId": "create_global_models_global_post",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateGlobalModel"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {

                }
              }
            }
          },
          "404": {
            "description": "Not found"
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/admins/models/domestic": {
      "get": {
        "tags": [
          "admins"
        ],
        "summary": "Search Domestic Models",
        "description": "국내 모델 리스트 조회 (검색 조건 포함)\n- 관리자 권한 필요",
        "operationId": "search_domestic_models_admins_models_domestic_get",
        "security": [
          {
            "HTTPBearer": []
          }
        ],
        "parameters": [
          {
            "name": "name",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "description": "이름 (부분 검색)",
              "title": "Name"
            },
            "description": "이름 (부분 검색)"
          },
          {
            "name": "gender",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "description": "성별",
              "title": "Gender"
            },
            "description": "성별"
          },
          {
            "name": "address_city",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "description": "주소 (시)",
              "title": "Address City"
            },
            "description": "주소 (시)"
          },
          {
            "name": "address_district",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "description": "주소 (구)",
              "title": "Address District"
            },
            "description": "주소 (구)"
          },
          {
            "name": "special_abilities",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "description": "특기",
              "title": "Special Abilities"
            },
            "description": "특기"
          },
          {
            "name": "other_languages",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "description": "가능한 외국어",
              "title": "Other Languages"
            },
            "description": "가능한 외국어"
          },
          {
            "name": "page",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "minimum": 1,
              "description": "페이지 번호",
              "default": 1,
              "title": "Page"
            },
            "description": "페이지 번호"
          },
          {
            "name": "page_size",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "maximum": 100,
              "minimum": 1,
              "description": "페이지 크기",
              "default": 20,
              "title": "Page Size"
            },
            "description": "페이지 크기"
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {

                }
              }
            }
          },
          "404": {
            "description": "Not found"
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "admins"
        ],
        "summary": "Create Domestic Model",
        "description": "국내 모델 등록\n- 관리자 권한 필요",
        "operationId": "create_domestic_model_admins_models_domestic_post",
        "security": [
          {
            "HTTPBearer": []
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateDomesticModel"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {

                }
              }
            }
          },
          "404": {
            "description": "Not found"
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "put": {
        "tags": [
          "admins"
        ],
        "summary": "Update Domestic Model",
        "description": "국내 모델 정보 수정\n- 관리자 권한 필요",
        "operationId": "update_domestic_model_admins_models_domestic_put",
        "security": [
          {
            "HTTPBearer": []
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateDomesticModel"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {

                }
              }
            }
          },
          "404": {
            "description": "Not found"
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/admins/models/global": {
      "get": {
        "tags": [
          "admins"
        ],
        "summary": "Search Global Models",
        "description": "해외 모델 리스트 조회 (검색 조건 포함)\n- 관리자 권한 필요",
        "operationId": "search_global_models_admins_models_global_get",
        "security": [
          {
            "HTTPBearer": []
          }
        ],
        "parameters": [
          {
            "name": "name",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "description": "이름 (부분 검색)",
              "title": "Name"
            },
            "description": "이름 (부분 검색)"
          },
          {
            "name": "gender",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "description": "성별",
              "title": "Gender"
            },
            "description": "성별"
          },
          {
            "name": "address_city",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "description": "주소 (시)",
              "title": "Address City"
            },
            "description": "주소 (시)"
          },
          {
            "name": "address_district",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "description": "주소 (구)",
              "title": "Address District"
            },
            "description": "주소 (구)"
          },
          {
            "name": "special_abilities",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "description": "특기",
              "title": "Special Abilities"
            },
            "description": "특기"
          },
          {
            "name": "other_languages",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "description": "가능한 외국어",
              "title": "Other Languages"
            },
            "description": "가능한 외국어"
          },
          {
            "name": "korean_level",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "description": "한국어 수준",
              "title": "Korean Level"
            },
            "description": "한국어 수준"
          },
          {
            "name": "page",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "minimum": 1,
              "description": "페이지 번호",
              "default": 1,
              "title": "Page"
            },
            "description": "페이지 번호"
          },
          {
            "name": "page_size",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "maximum": 100,
              "minimum": 1,
              "description": "페이지 크기",
              "default": 20,
              "title": "Page Size"
            },
            "description": "페이지 크기"
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {

                }
              }
            }
          },
          "404": {
            "description": "Not found"
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "admins"
        ],
        "summary": "Create Global Model",
        "description": "해외 모델 등록\n- 관리자 권한 필요",
        "operationId": "create_global_model_admins_models_global_post",
        "security": [
          {
            "HTTPBearer": []
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateGlobalModel"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {

                }
              }
            }
          },
          "404": {
            "description": "Not found"
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "put": {
        "tags": [
          "admins"
        ],
        "summary": "Update Global Model",
        "description": "해외 모델 정보 수정\n- 관리자 권한 필요",
        "operationId": "update_global_model_admins_models_global_put",
        "security": [
          {
            "HTTPBearer": []
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateGlobalModel"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {

                }
              }
            }
          },
          "404": {
            "description": "Not found"
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/admins/models/{model_id}/physical": {
      "get": {
        "tags": [
          "admins"
        ],
        "summary": "Get Physical Size",
        "description": "모델 신체 사이즈 조회\n- 관리자 권한 필요",
        "operationId": "get_physical_size_admins_models__model_id__physical_get",
        "security": [
          {
            "HTTPBearer": []
          }
        ],
        "parameters": [
          {
            "name": "model_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid",
              "title": "Model Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/PhysicalSizeResponse"
                }
              }
            }
          },
          "404": {
            "description": "Not found"
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/admins/models/cameraTest": {
      "post": {
        "tags": [
          "admins"
        ],
        "summary": "Create Camera Test",
        "description": "기존 등록 모델 카메라 테스트 등록\n- 현재 시간 기준으로 등록\n- 관리자 또는 디렉터 권한 필요",
        "operationId": "create_camera_test_admins_models_cameraTest_post",
        "security": [
          {
            "HTTPBearer": []
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CameraTestCreate"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CameraTestResponse"
                }
              }
            }
          },
          "404": {
            "description": "Not found"
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "get": {
        "tags": [
          "admins"
        ],
        "summary": "Get Camera Test",
        "description": "카메라테스트 목록 조회\n- 관리자 또는 디렉터 권한 필요\n- 특정 날짜(target_date)의 카메라테스트를 모델당 1건(가장 이른 방문)으로 그룹핑하여 시간 오름차순 반환",
        "operationId": "get_camera_test_admins_models_cameraTest_get",
        "security": [
          {
            "HTTPBearer": []
          }
        ],
        "parameters": [
          {
            "name": "target_date",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "string",
                  "format": "date"
                },
                {
                  "type": "null"
                }
              ],
              "description": "YYYY-MM-DD. 미전송 시 오늘 기준",
              "title": "Target Date"
            },
            "description": "YYYY-MM-DD. 미전송 시 오늘 기준"
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {

                }
              }
            }
          },
          "404": {
            "description": "Not found"
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/admins/models/{model_id}/cameraTest": {
      "put": {
        "tags": [
          "admins"
        ],
        "summary": "Update Camera Test Status",
        "description": "카메라 테스트 상태 변경\n- 준비중 → 테스트중 → 완료\n- 관리자 또는 디렉터 권한 필요",
        "operationId": "update_camera_test_status_admins_models__model_id__cameraTest_put",
        "security": [
          {
            "HTTPBearer": []
          }
        ],
        "parameters": [
          {
            "name": "model_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid",
              "title": "Model Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CameraTestStatusUpdate"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CameraTestResponse"
                }
              }
            }
          },
          "404": {
            "description": "Not found"
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/admins/dashboard": {
      "get": {
        "tags": [
          "admins"
        ],
        "summary": "Get Dashboard",
        "description": "대시보드 정보 조회\n- 요약 정보: 금일 등록, 카메라테스트 미완료, 주소록 미완료\n- 주간 통계: 최근 7일 일별 등록 인원\n- 월간 통계: 최근 30일 일별 등록 인원\n- 관리자 또는 디렉터 권한 필요",
        "operationId": "get_dashboard_admins_dashboard_get",
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DashboardResponse"
                }
              }
            }
          },
          "404": {
            "description": "Not found"
          }
        },
        "security": [
          {
            "HTTPBearer": []
          }
        ]
      }
    },
    "/mails/tempPassword": {
      "post": {
        "tags": [
          "mails"
        ],
        "summary": "Send Temp Password",
        "description": "임시 비밀번호 발송\n\n- 입력된 이메일(pid)로 계정을 찾음\n- 임시 비밀번호를 생성하여 DB에 저장\n- 생성된 임시 비밀번호를 이메일로 전송",
        "operationId": "send_temp_password_mails_tempPassword_post",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/TempPasswordRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/TempPasswordResponse"
                }
              }
            }
          },
          "404": {
            "description": "Not found"
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/excel/domestic": {
      "get": {
        "tags": [
          "excel"
        ],
        "summary": "Get Domestic Models Excel",
        "description": "국내 모델 리스트 엑셀 다운로드\n\n국내 모델의 모든 정보를 엑셀 파일(.xlsx)로 다운로드합니다.\n\n**포함 정보**:\n- 기본 정보: ID, 이름, 예명, 생년월일, 성별, 전화번호, 국적\n- 소속사 정보: 소속사명, 담당자, 전화번호\n- SNS: 인스타그램, 틱톡, 유튜브\n- 주소: 도시, 구/군, 상세주소\n- 기타: 특기, 언어, 타투 정보\n- 신체: 키, 몸무게, 의류 사이즈\n\n**파일명**: `국내모델목록_YYYYMMDD_HHMMSS.xlsx`\n\n**사용 예시**:\n```bash\ncurl -X GET \"http://localhost:8000/excel/domestic\" --output domestic_models.xlsx\n```\n\n또는 브라우저에서:\n```\nhttp://localhost:8000/excel/domestic\n```",
        "operationId": "get_domestic_models_excel_excel_domestic_get",
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {

                }
              }
            }
          },
          "404": {
            "description": "Not found"
          }
        }
      }
    },
    "/excel/global": {
      "get": {
        "tags": [
          "excel"
        ],
        "summary": "Get Global Models Excel",
        "description": "해외 모델 리스트 엑셀 다운로드\n\n해외 모델의 모든 정보를 엑셀 파일(.xlsx)로 다운로드합니다.\n\n**포함 정보**:\n- 기본 정보: ID, 이름, 예명, 생년월일, 성별, 전화번호, 국적\n- SNS: 인스타그램, 유튜브, 카카오톡\n- 주소: 도시, 구/군, 상세주소\n- 언어: 모국어, 기타 언어, 한국어 수준\n- 기타: 특기, 타투 정보, 비자 타입\n- 신체: 키, 몸무게, 의류 사이즈\n\n**파일명**: `해외모델목록_YYYYMMDD_HHMMSS.xlsx`\n\n**사용 예시**:\n```bash\ncurl -X GET \"http://localhost:8000/excel/global\" --output global_models.xlsx\n```\n\n또는 브라우저에서:\n```\nhttp://localhost:8000/excel/global\n```",
        "operationId": "get_global_models_excel_excel_global_get",
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {

                }
              }
            }
          },
          "404": {
            "description": "Not found"
          }
        }
      }
    },
    "/accounts/signup/admins": {
      "post": {
        "tags": [
          "accounts"
        ],
        "summary": "Create Admin",
        "description": "관리자 계정 생성\n\n- **name**: 관리자 이름\n- **pid**: 이메일 (고유, 중복 불가)\n- **password**: 비밀번호 (8-20자, 영문+숫자+특수문자)\n- **provider**: 가입 경로 (LOCAL/GOOGLE/KAKAO/NAVER)\n- **provider_id**: 소셜 로그인 ID (선택)",
        "operationId": "create_admin_accounts_signup_admins_post",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SignUpAdminRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "201": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UserResponse"
                }
              }
            }
          },
          "404": {
            "description": "Not found"
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/accounts/signup/directors": {
      "post": {
        "tags": [
          "accounts"
        ],
        "summary": "Create Director",
        "description": "감독 계정 생성\n\n- **name**: 감독 이름\n- **pid**: 이메일 (고유, 중복 불가)\n- **password**: 비밀번호 (8-20자, 영문+숫자+특수문자)\n- **provider**: 가입 경로 (LOCAL/GOOGLE/KAKAO/NAVER)\n- **provider_id**: 소셜 로그인 ID (선택)",
        "operationId": "create_director_accounts_signup_directors_post",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SignUpDirectorRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "201": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UserResponse"
                }
              }
            }
          },
          "404": {
            "description": "Not found"
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/accounts/password/admins": {
      "post": {
        "tags": [
          "accounts"
        ],
        "summary": "Change Admins Password",
        "description": "관리자 계정 비밀번호 변경\n\n- **pid**: 이메일\n- **current_password**: 현재 비밀번호\n- **new_password**: 새 비밀번호 (8-20자, 영문+숫자+특수문자)",
        "operationId": "change_admins_password_accounts_password_admins_post",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/PasswordChangeRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AccountResponse"
                }
              }
            }
          },
          "404": {
            "description": "Not found"
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/accounts/password/directors": {
      "post": {
        "tags": [
          "accounts"
        ],
        "summary": "Change Directors Password",
        "description": "감독 계정 비밀번호 변경\n\n- **pid**: 이메일\n- **current_password**: 현재 비밀번호\n- **new_password**: 새 비밀번호 (8-20자, 영문+숫자+특수문자)",
        "operationId": "change_directors_password_accounts_password_directors_post",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/PasswordChangeRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AccountResponse"
                }
              }
            }
          },
          "404": {
            "description": "Not found"
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/accounts/directors/{director_id}": {
      "delete": {
        "tags": [
          "accounts"
        ],
        "summary": "Withdraw Director",
        "description": "감독 계정 삭제\n\n- **director_id**: 삭제할 감독 계정의 UUID",
        "operationId": "withdraw_director_accounts_directors__director_id__delete",
        "parameters": [
          {
            "name": "director_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid",
              "title": "Director Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AccountResponse"
                }
              }
            }
          },
          "404": {
            "description": "Not found"
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/accounts/login": {
      "post": {
        "tags": [
          "accounts"
        ],
        "summary": "Login",
        "description": "로그인\n\n- **pid**: 이메일\n- **password**: 비밀번호\n\n**Returns**:\n- **access_token**: JWT 액세스 토큰 (유효기간: 4시간)\n- **refresh_token**: JWT 리프레시 토큰 (유효기간: 3일)\n- **token_type**: bearer\n- **user**: 사용자 정보",
        "operationId": "login_accounts_login_post",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/LoginRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/LoginResponse"
                }
              }
            }
          },
          "404": {
            "description": "Not found"
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/accounts/refresh": {
      "post": {
        "tags": [
          "accounts"
        ],
        "summary": "Refresh Token",
        "description": "토큰 갱신\n\n액세스 토큰이 만료되었을 때 리프레시 토큰으로 새로운 토큰을 발급받습니다.\n\n- **refresh_token**: 유효한 리프레시 토큰\n\n**Returns**:\n- **access_token**: 새로운 JWT 액세스 토큰 (유효기간: 4시간)\n- **refresh_token**: 새로운 JWT 리프레시 토큰 (유효기간: 3일)\n- **token_type**: bearer\n\n**Note**: 보안을 위해 리프레시 토큰도 함께 갱신됩니다.",
        "operationId": "refresh_token_accounts_refresh_post",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/RefreshTokenRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/RefreshTokenResponse"
                }
              }
            }
          },
          "404": {
            "description": "Not found"
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/": {
      "get": {
        "summary": "Root",
        "description": "루트 엔드포인트",
        "operationId": "root__get",
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {

                }
              }
            }
          }
        }
      }
    },
    "/health": {
      "get": {
        "summary": "Health",
        "operationId": "health_health_get",
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {

                }
              }
            }
          }
        }
      }
    }

},
"components": {
"schemas": {
"AccountResponse": {
"properties": {
"message": {
"type": "string",
"title": "Message",
"description": "응답 메시지"
}
},
"type": "object",
"required": [
"message"
],
"title": "AccountResponse",
"description": "일반 응답"
},
"CameraTestCreate": {
"properties": {
"model_id": {
"type": "string",
"format": "uuid",
"title": "Model Id",
"description": "모델 ID"
}
},
"type": "object",
"required": [
"model_id"
],
"title": "CameraTestCreate",
"description": "카메라 테스트 등록 요청"
},
"CameraTestResponse": {
"properties": {
"id": {
"type": "integer",
"title": "Id"
},
"model_id": {
"type": "string",
"format": "uuid",
"title": "Model Id"
},
"is_tested": {
"$ref": "#/components/schemas/CameraTestStatus"
          },
          "visited_at": {
            "type": "string",
            "format": "date-time",
            "title": "Visited At"
          }
        },
        "type": "object",
        "required": [
          "id",
          "model_id",
          "is_tested",
          "visited_at"
        ],
        "title": "CameraTestResponse",
        "description": "카메라 테스트 응답"
      },
      "CameraTestStatus": {
        "type": "string",
        "enum": [
          "PENDING",
          "CONFIRMED",
          "COMPLETED",
          "CANCELLED"
        ],
        "title": "CameraTestStatus",
        "description": "카메라 테스트 상태 (DB enum camerateststatusenum과 매핑)"
      },
      "CameraTestStatusUpdate": {
        "properties": {
          "status": {
            "$ref": "#/components/schemas/CameraTestStatus",
"description": "변경할 상태"
}
},
"type": "object",
"required": [
"status"
],
"title": "CameraTestStatusUpdate",
"description": "카메라 테스트 상태 변경 요청"
},
"CreateDomesticModel": {
"properties": {
"name": {
"type": "string",
"maxLength": 100,
"minLength": 1,
"title": "Name"
},
"stage_name": {
"anyOf": [
{
"type": "string",
"maxLength": 100
},
{
"type": "null"
}
],
"title": "Stage Name"
},
"birth_date": {
"type": "string",
"format": "date",
"title": "Birth Date"
},
"gender": {
"$ref": "#/components/schemas/Gender"
          },
          "phone": {
            "type": "string",
            "title": "Phone",
            "example": "+821012345678"
          },
          "nationality": {
            "anyOf": [
              {
                "type": "string",
                "maxLength": 50
              },
              {
                "type": "null"
              }
            ],
            "title": "Nationality"
          },
          "instagram": {
            "anyOf": [
              {
                "type": "string",
                "maxLength": 100
              },
              {
                "type": "null"
              }
            ],
            "title": "Instagram"
          },
          "youtube": {
            "anyOf": [
              {
                "type": "string",
                "maxLength": 100
              },
              {
                "type": "null"
              }
            ],
            "title": "Youtube"
          },
          "address_city": {
            "anyOf": [
              {
                "type": "string",
                "maxLength": 50
              },
              {
                "type": "null"
              }
            ],
            "title": "Address City"
          },
          "address_district": {
            "anyOf": [
              {
                "type": "string",
                "maxLength": 50
              },
              {
                "type": "null"
              }
            ],
            "title": "Address District"
          },
          "address_street": {
            "anyOf": [
              {
                "type": "string",
                "maxLength": 200
              },
              {
                "type": "null"
              }
            ],
            "title": "Address Street"
          },
          "special_abilities": {
            "anyOf": [
              {
                "type": "string",
                "maxLength": 500
              },
              {
                "type": "null"
              }
            ],
            "title": "Special Abilities"
          },
          "other_languages": {
            "anyOf": [
              {
                "type": "string",
                "maxLength": 200
              },
              {
                "type": "null"
              }
            ],
            "title": "Other Languages"
          },
          "has_tattoo": {
            "type": "boolean",
            "title": "Has Tattoo",
            "default": false
          },
          "tattoo_location": {
            "anyOf": [
              {
                "type": "string",
                "maxLength": 100
              },
              {
                "type": "null"
              }
            ],
            "title": "Tattoo Location"
          },
          "tattoo_size": {
            "anyOf": [
              {
                "type": "string",
                "maxLength": 50
              },
              {
                "type": "null"
              }
            ],
            "title": "Tattoo Size"
          },
          "height": {
            "type": "number",
            "maximum": 300,
            "exclusiveMinimum": 0,
            "title": "Height"
          },
          "weight": {
            "anyOf": [
              {
                "type": "number",
                "maximum": 500,
                "exclusiveMinimum": 0
              },
              {
                "type": "null"
              }
            ],
            "title": "Weight"
          },
          "top_size": {
            "anyOf": [
              {
                "type": "string",
                "maxLength": 10
              },
              {
                "type": "null"
              }
            ],
            "title": "Top Size"
          },
          "bottom_size": {
            "anyOf": [
              {
                "type": "string",
                "maxLength": 10
              },
              {
                "type": "null"
              }
            ],
            "title": "Bottom Size"
          },
          "shoes_size": {
            "anyOf": [
              {
                "type": "string",
                "maxLength": 10
              },
              {
                "type": "null"
              }
            ],
            "title": "Shoes Size"
          },
          "is_foreigner": {
            "type": "boolean",
            "title": "Is Foreigner",
            "default": false
          },
          "has_agency": {
            "type": "boolean",
            "title": "Has Agency",
            "default": false
          },
          "agency_name": {
            "anyOf": [
              {
                "type": "string",
                "maxLength": 100
              },
              {
                "type": "null"
              }
            ],
            "title": "Agency Name"
          },
          "agency_manager_name": {
            "anyOf": [
              {
                "type": "string",
                "maxLength": 100
              },
              {
                "type": "null"
              }
            ],
            "title": "Agency Manager Name"
          },
          "agency_manager_phone": {
            "type": "string",
            "title": "Agency Manager Phone",
            "example": "+821012345678",
            "nullable": true
          },
          "tictok": {
            "anyOf": [
              {
                "type": "string",
                "maxLength": 100
              },
              {
                "type": "null"
              }
            ],
            "title": "Tictok"
          }
        },
        "type": "object",
        "required": [
          "name",
          "birth_date",
          "gender",
          "phone",
          "height"
        ],
        "title": "CreateDomesticModel"
      },
      "CreateGlobalModel": {
        "properties": {
          "name": {
            "type": "string",
            "maxLength": 100,
            "minLength": 1,
            "title": "Name"
          },
          "stage_name": {
            "anyOf": [
              {
                "type": "string",
                "maxLength": 100
              },
              {
                "type": "null"
              }
            ],
            "title": "Stage Name"
          },
          "birth_date": {
            "type": "string",
            "format": "date",
            "title": "Birth Date"
          },
          "gender": {
            "$ref": "#/components/schemas/Gender"
},
"phone": {
"type": "string",
"title": "Phone",
"example": "+821012345678"
},
"nationality": {
"anyOf": [
{
"type": "string",
"maxLength": 50
},
{
"type": "null"
}
],
"title": "Nationality"
},
"instagram": {
"anyOf": [
{
"type": "string",
"maxLength": 100
},
{
"type": "null"
}
],
"title": "Instagram"
},
"youtube": {
"anyOf": [
{
"type": "string",
"maxLength": 100
},
{
"type": "null"
}
],
"title": "Youtube"
},
"address_city": {
"anyOf": [
{
"type": "string",
"maxLength": 50
},
{
"type": "null"
}
],
"title": "Address City"
},
"address_district": {
"anyOf": [
{
"type": "string",
"maxLength": 50
},
{
"type": "null"
}
],
"title": "Address District"
},
"address_street": {
"anyOf": [
{
"type": "string",
"maxLength": 200
},
{
"type": "null"
}
],
"title": "Address Street"
},
"special_abilities": {
"anyOf": [
{
"type": "string",
"maxLength": 500
},
{
"type": "null"
}
],
"title": "Special Abilities"
},
"other_languages": {
"anyOf": [
{
"type": "string",
"maxLength": 200
},
{
"type": "null"
}
],
"title": "Other Languages"
},
"has_tattoo": {
"type": "boolean",
"title": "Has Tattoo",
"default": false
},
"tattoo_location": {
"anyOf": [
{
"type": "string",
"maxLength": 100
},
{
"type": "null"
}
],
"title": "Tattoo Location"
},
"tattoo_size": {
"anyOf": [
{
"type": "string",
"maxLength": 50
},
{
"type": "null"
}
],
"title": "Tattoo Size"
},
"height": {
"type": "number",
"maximum": 300,
"exclusiveMinimum": 0,
"title": "Height"
},
"weight": {
"anyOf": [
{
"type": "number",
"maximum": 500,
"exclusiveMinimum": 0
},
{
"type": "null"
}
],
"title": "Weight"
},
"top_size": {
"anyOf": [
{
"type": "string",
"maxLength": 10
},
{
"type": "null"
}
],
"title": "Top Size"
},
"bottom_size": {
"anyOf": [
{
"type": "string",
"maxLength": 10
},
{
"type": "null"
}
],
"title": "Bottom Size"
},
"shoes_size": {
"anyOf": [
{
"type": "string",
"maxLength": 10
},
{
"type": "null"
}
],
"title": "Shoes Size"
},
"is_foreigner": {
"type": "boolean",
"title": "Is Foreigner",
"default": false
},
"kakaotalk": {
"anyOf": [
{
"type": "string",
"maxLength": 100
},
{
"type": "null"
}
],
"title": "Kakaotalk"
},
"first_language": {
"anyOf": [
{
"type": "string",
"maxLength": 50
},
{
"type": "null"
}
],
"title": "First Language"
},
"korean_level": {
"$ref": "#/components/schemas/KoreanLevel"
          },
          "visa_type": {
            "$ref": "#/components/schemas/VisaType"
}
},
"type": "object",
"required": [
"name",
"birth_date",
"gender",
"phone",
"height",
"korean_level",
"visa_type"
],
"title": "CreateGlobalModel"
},
"DailyRegistration": {
"properties": {
"date": {
"type": "string",
"format": "date",
"title": "Date"
},
"count": {
"type": "integer",
"title": "Count"
}
},
"type": "object",
"required": [
"date",
"count"
],
"title": "DailyRegistration",
"description": "일별 등록 통계"
},
"DashboardMonthlyStats": {
"properties": {
"daily_registrations": {
"items": {
"$ref": "#/components/schemas/DailyRegistration"
            },
            "type": "array",
            "title": "Daily Registrations",
            "description": "일별 등록 인원 (최근 30일)"
          }
        },
        "type": "object",
        "required": [
          "daily_registrations"
        ],
        "title": "DashboardMonthlyStats",
        "description": "월간 대시보드 통계"
      },
      "DashboardResponse": {
        "properties": {
          "summary": {
            "$ref": "#/components/schemas/DashboardSummary"
},
"weekly_stats": {
"$ref": "#/components/schemas/DashboardWeeklyStats"
          },
          "monthly_stats": {
            "$ref": "#/components/schemas/DashboardMonthlyStats"
}
},
"type": "object",
"required": [
"summary",
"weekly_stats",
"monthly_stats"
],
"title": "DashboardResponse",
"description": "대시보드 전체 응답"
},
"DashboardSummary": {
"properties": {
"today_registrations": {
"type": "integer",
"title": "Today Registrations",
"description": "금일 등록 모델 수"
},
"today_incomplete_camera_tests": {
"type": "integer",
"title": "Today Incomplete Camera Tests",
"description": "금일 카메라테스트 미완료 인원"
},
"incomplete_addresses": {
"type": "integer",
"title": "Incomplete Addresses",
"description": "주소록 등록 미완료 인원"
}
},
"type": "object",
"required": [
"today_registrations",
"today_incomplete_camera_tests",
"incomplete_addresses"
],
"title": "DashboardSummary",
"description": "대시보드 요약 정보"
},
"DashboardWeeklyStats": {
"properties": {
"daily_registrations": {
"items": {
"$ref": "#/components/schemas/DailyRegistration"
            },
            "type": "array",
            "title": "Daily Registrations",
            "description": "일별 등록 인원 (최근 7일)"
          }
        },
        "type": "object",
        "required": [
          "daily_registrations"
        ],
        "title": "DashboardWeeklyStats",
        "description": "주간 대시보드 통계"
      },
      "Gender": {
        "type": "string",
        "enum": [
          "MALE",
          "FEMALE",
          "OTHERS"
        ],
        "title": "Gender"
      },
      "HTTPValidationError": {
        "properties": {
          "detail": {
            "items": {
              "$ref": "#/components/schemas/ValidationError"
},
"type": "array",
"title": "Detail"
}
},
"type": "object",
"title": "HTTPValidationError"
},
"KoreanLevel": {
"type": "string",
"enum": [
"BAD",
"NOT_BAD",
"GOOD",
"VERY_GOOD"
],
"title": "KoreanLevel"
},
"LoginRequest": {
"properties": {
"pid": {
"type": "string",
"format": "email",
"title": "Pid",
"description": "이메일"
},
"password": {
"type": "string",
"title": "Password",
"description": "비밀번호"
}
},
"type": "object",
"required": [
"pid",
"password"
],
"title": "LoginRequest",
"description": "로그인 요청"
},
"LoginResponse": {
"properties": {
"access_token": {
"type": "string",
"title": "Access Token",
"description": "JWT 액세스 토큰 (4시간)"
},
"refresh_token": {
"type": "string",
"title": "Refresh Token",
"description": "JWT 리프레시 토큰 (3일)"
},
"token_type": {
"type": "string",
"title": "Token Type",
"description": "토큰 타입",
"default": "bearer"
},
"user": {
"$ref": "#/components/schemas/UserResponse",
            "description": "사용자 정보"
          }
        },
        "type": "object",
        "required": [
          "access_token",
          "refresh_token",
          "user"
        ],
        "title": "LoginResponse",
        "description": "로그인 응답"
      },
      "PasswordChangeRequest": {
        "properties": {
          "pid": {
            "type": "string",
            "format": "email",
            "title": "Pid",
            "description": "이메일"
          },
          "current_password": {
            "type": "string",
            "title": "Current Password",
            "description": "현재 비밀번호"
          },
          "new_password": {
            "type": "string",
            "maxLength": 20,
            "minLength": 8,
            "title": "New Password",
            "description": "새 비밀번호"
          }
        },
        "type": "object",
        "required": [
          "pid",
          "current_password",
          "new_password"
        ],
        "title": "PasswordChangeRequest",
        "description": "비밀번호 변경 요청"
      },
      "PhysicalSizeResponse": {
        "properties": {
          "model_id": {
            "type": "string",
            "format": "uuid",
            "title": "Model Id"
          },
          "name": {
            "type": "string",
            "title": "Name"
          },
          "height": {
            "anyOf": [
              {
                "type": "number"
              },
              {
                "type": "null"
              }
            ],
            "title": "Height"
          },
          "weight": {
            "anyOf": [
              {
                "type": "number"
              },
              {
                "type": "null"
              }
            ],
            "title": "Weight"
          },
          "top_size": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Top Size"
          },
          "bottom_size": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Bottom Size"
          },
          "shoes_size": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Shoes Size"
          }
        },
        "type": "object",
        "required": [
          "model_id",
          "name"
        ],
        "title": "PhysicalSizeResponse",
        "description": "모델 신체 사이즈 응답"
      },
      "Provider": {
        "type": "string",
        "enum": [
          "LOCAL",
          "GOOGLE",
          "KAKAO",
          "NAVER"
        ],
        "title": "Provider",
        "description": "소셜 로그인 제공자"
      },
      "ReadRevisitedModel": {
        "properties": {
          "name": {
            "type": "string",
            "title": "Name"
          },
          "phone": {
            "type": "string",
            "title": "Phone",
            "example": "+821012345678"
          },
          "birth": {
            "type": "string",
            "format": "date",
            "title": "Birth"
          }
        },
        "type": "object",
        "required": [
          "name",
          "phone",
          "birth"
        ],
        "title": "ReadRevisitedModel"
      },
      "RefreshTokenRequest": {
        "properties": {
          "refresh_token": {
            "type": "string",
            "title": "Refresh Token",
            "description": "리프레시 토큰"
          }
        },
        "type": "object",
        "required": [
          "refresh_token"
        ],
        "title": "RefreshTokenRequest",
        "description": "토큰 갱신 요청"
      },
      "RefreshTokenResponse": {
        "properties": {
          "access_token": {
            "type": "string",
            "title": "Access Token",
            "description": "새로운 JWT 액세스 토큰 (4시간)"
          },
          "refresh_token": {
            "type": "string",
            "title": "Refresh Token",
            "description": "새로운 JWT 리프레시 토큰 (3일)"
          },
          "token_type": {
            "type": "string",
            "title": "Token Type",
            "description": "토큰 타입",
            "default": "bearer"
          }
        },
        "type": "object",
        "required": [
          "access_token",
          "refresh_token"
        ],
        "title": "RefreshTokenResponse",
        "description": "토큰 갱신 응답"
      },
      "SignUpAdminRequest": {
        "properties": {
          "name": {
            "type": "string",
            "maxLength": 100,
            "minLength": 1,
            "title": "Name",
            "description": "사용자 이름"
          },
          "pid": {
            "type": "string",
            "format": "email",
            "title": "Pid",
            "description": "이메일 (고유 식별자)"
          },
          "password": {
            "type": "string",
            "maxLength": 20,
            "minLength": 8,
            "title": "Password",
            "description": "비밀번호"
          },
          "role": {
            "$ref": "#/components/schemas/UserRole",
"description": "관리자 역할",
"default": "ADMIN"
},
"provider": {
"$ref": "#/components/schemas/Provider",
            "description": "가입 경로",
            "default": "LOCAL"
          },
          "provider_id": {
            "anyOf": [
              {
                "type": "string",
                "maxLength": 255
              },
              {
                "type": "null"
              }
            ],
            "title": "Provider Id",
            "description": "소셜 로그인 ID"
          }
        },
        "type": "object",
        "required": [
          "name",
          "pid",
          "password"
        ],
        "title": "SignUpAdminRequest",
        "description": "관리자 회원가입 요청 (role 고정)"
      },
      "SignUpDirectorRequest": {
        "properties": {
          "name": {
            "type": "string",
            "maxLength": 100,
            "minLength": 1,
            "title": "Name",
            "description": "사용자 이름"
          },
          "pid": {
            "type": "string",
            "format": "email",
            "title": "Pid",
            "description": "이메일 (고유 식별자)"
          },
          "password": {
            "type": "string",
            "maxLength": 20,
            "minLength": 8,
            "title": "Password",
            "description": "비밀번호"
          },
          "role": {
            "$ref": "#/components/schemas/UserRole",
"description": "감독 역할",
"default": "DIRECTOR"
},
"provider": {
"$ref": "#/components/schemas/Provider",
            "description": "가입 경로",
            "default": "LOCAL"
          },
          "provider_id": {
            "anyOf": [
              {
                "type": "string",
                "maxLength": 255
              },
              {
                "type": "null"
              }
            ],
            "title": "Provider Id",
            "description": "소셜 로그인 ID"
          }
        },
        "type": "object",
        "required": [
          "name",
          "pid",
          "password"
        ],
        "title": "SignUpDirectorRequest",
        "description": "감독 회원가입 요청 (role 고정)"
      },
      "TempPasswordRequest": {
        "properties": {
          "pid": {
            "type": "string",
            "format": "email",
            "title": "Pid",
            "description": "사용자 이메일 (계정 식별자)"
          }
        },
        "type": "object",
        "required": [
          "pid"
        ],
        "title": "TempPasswordRequest",
        "description": "임시 비밀번호 발송 요청"
      },
      "TempPasswordResponse": {
        "properties": {
          "message": {
            "type": "string",
            "title": "Message",
            "description": "처리 결과 메시지"
          },
          "email": {
            "type": "string",
            "title": "Email",
            "description": "임시 비밀번호가 발송된 이메일 주소"
          }
        },
        "type": "object",
        "required": [
          "message",
          "email"
        ],
        "title": "TempPasswordResponse",
        "description": "임시 비밀번호 발송 응답"
      },
      "UpdateDomesticModel": {
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid",
            "title": "Id"
          },
          "name": {
            "anyOf": [
              {
                "type": "string",
                "maxLength": 100,
                "minLength": 1
              },
              {
                "type": "null"
              }
            ],
            "title": "Name"
          },
          "stage_name": {
            "anyOf": [
              {
                "type": "string",
                "maxLength": 100
              },
              {
                "type": "null"
              }
            ],
            "title": "Stage Name"
          },
          "birth_date": {
            "anyOf": [
              {
                "type": "string",
                "format": "date"
              },
              {
                "type": "null"
              }
            ],
            "title": "Birth Date"
          },
          "gender": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/Gender"
},
{
"type": "null"
}
]
},
"phone": {
"type": "string",
"title": "Phone",
"example": "+821012345678",
"nullable": true
},
"nationality": {
"anyOf": [
{
"type": "string",
"maxLength": 50
},
{
"type": "null"
}
],
"title": "Nationality"
},
"instagram": {
"anyOf": [
{
"type": "string",
"maxLength": 100
},
{
"type": "null"
}
],
"title": "Instagram"
},
"youtube": {
"anyOf": [
{
"type": "string",
"maxLength": 100
},
{
"type": "null"
}
],
"title": "Youtube"
},
"address_city": {
"anyOf": [
{
"type": "string",
"maxLength": 50
},
{
"type": "null"
}
],
"title": "Address City"
},
"address_district": {
"anyOf": [
{
"type": "string",
"maxLength": 50
},
{
"type": "null"
}
],
"title": "Address District"
},
"address_street": {
"anyOf": [
{
"type": "string",
"maxLength": 200
},
{
"type": "null"
}
],
"title": "Address Street"
},
"special_abilities": {
"anyOf": [
{
"type": "string",
"maxLength": 500
},
{
"type": "null"
}
],
"title": "Special Abilities"
},
"other_languages": {
"anyOf": [
{
"type": "string",
"maxLength": 200
},
{
"type": "null"
}
],
"title": "Other Languages"
},
"has_tattoo": {
"anyOf": [
{
"type": "boolean"
},
{
"type": "null"
}
],
"title": "Has Tattoo"
},
"tattoo_location": {
"anyOf": [
{
"type": "string",
"maxLength": 100
},
{
"type": "null"
}
],
"title": "Tattoo Location"
},
"tattoo_size": {
"anyOf": [
{
"type": "string",
"maxLength": 50
},
{
"type": "null"
}
],
"title": "Tattoo Size"
},
"height": {
"anyOf": [
{
"type": "number",
"maximum": 300,
"exclusiveMinimum": 0
},
{
"type": "null"
}
],
"title": "Height"
},
"weight": {
"anyOf": [
{
"type": "number",
"maximum": 500,
"exclusiveMinimum": 0
},
{
"type": "null"
}
],
"title": "Weight"
},
"top_size": {
"anyOf": [
{
"type": "string",
"maxLength": 10
},
{
"type": "null"
}
],
"title": "Top Size"
},
"bottom_size": {
"anyOf": [
{
"type": "string",
"maxLength": 10
},
{
"type": "null"
}
],
"title": "Bottom Size"
},
"shoes_size": {
"anyOf": [
{
"type": "string",
"maxLength": 10
},
{
"type": "null"
}
],
"title": "Shoes Size"
},
"is_foreigner": {
"anyOf": [
{
"type": "boolean"
},
{
"type": "null"
}
],
"title": "Is Foreigner"
},
"has_agency": {
"anyOf": [
{
"type": "boolean"
},
{
"type": "null"
}
],
"title": "Has Agency"
},
"agency_name": {
"anyOf": [
{
"type": "string",
"maxLength": 100
},
{
"type": "null"
}
],
"title": "Agency Name"
},
"agency_manager_name": {
"anyOf": [
{
"type": "string",
"maxLength": 100
},
{
"type": "null"
}
],
"title": "Agency Manager Name"
},
"agency_manager_phone": {
"type": "string",
"title": "Agency Manager Phone",
"example": "+821012345678",
"nullable": true
},
"tictok": {
"anyOf": [
{
"type": "string",
"maxLength": 100
},
{
"type": "null"
}
],
"title": "Tictok"
}
},
"type": "object",
"required": [
"id"
],
"title": "UpdateDomesticModel"
},
"UpdateGlobalModel": {
"properties": {
"id": {
"type": "string",
"format": "uuid",
"title": "Id"
},
"name": {
"anyOf": [
{
"type": "string",
"maxLength": 100,
"minLength": 1
},
{
"type": "null"
}
],
"title": "Name"
},
"stage_name": {
"anyOf": [
{
"type": "string",
"maxLength": 100
},
{
"type": "null"
}
],
"title": "Stage Name"
},
"birth_date": {
"anyOf": [
{
"type": "string",
"format": "date"
},
{
"type": "null"
}
],
"title": "Birth Date"
},
"gender": {
"anyOf": [
{
"$ref": "#/components/schemas/Gender"
},
{
"type": "null"
}
]
},
"phone": {
"type": "string",
"title": "Phone",
"example": "+821012345678",
"nullable": true
},
"nationality": {
"anyOf": [
{
"type": "string",
"maxLength": 50
},
{
"type": "null"
}
],
"title": "Nationality"
},
"instagram": {
"anyOf": [
{
"type": "string",
"maxLength": 100
},
{
"type": "null"
}
],
"title": "Instagram"
},
"youtube": {
"anyOf": [
{
"type": "string",
"maxLength": 100
},
{
"type": "null"
}
],
"title": "Youtube"
},
"address_city": {
"anyOf": [
{
"type": "string",
"maxLength": 50
},
{
"type": "null"
}
],
"title": "Address City"
},
"address_district": {
"anyOf": [
{
"type": "string",
"maxLength": 50
},
{
"type": "null"
}
],
"title": "Address District"
},
"address_street": {
"anyOf": [
{
"type": "string",
"maxLength": 200
},
{
"type": "null"
}
],
"title": "Address Street"
},
"special_abilities": {
"anyOf": [
{
"type": "string",
"maxLength": 500
},
{
"type": "null"
}
],
"title": "Special Abilities"
},
"other_languages": {
"anyOf": [
{
"type": "string",
"maxLength": 200
},
{
"type": "null"
}
],
"title": "Other Languages"
},
"has_tattoo": {
"anyOf": [
{
"type": "boolean"
},
{
"type": "null"
}
],
"title": "Has Tattoo"
},
"tattoo_location": {
"anyOf": [
{
"type": "string",
"maxLength": 100
},
{
"type": "null"
}
],
"title": "Tattoo Location"
},
"tattoo_size": {
"anyOf": [
{
"type": "string",
"maxLength": 50
},
{
"type": "null"
}
],
"title": "Tattoo Size"
},
"height": {
"anyOf": [
{
"type": "number",
"maximum": 300,
"exclusiveMinimum": 0
},
{
"type": "null"
}
],
"title": "Height"
},
"weight": {
"anyOf": [
{
"type": "number",
"maximum": 500,
"exclusiveMinimum": 0
},
{
"type": "null"
}
],
"title": "Weight"
},
"top_size": {
"anyOf": [
{
"type": "string",
"maxLength": 10
},
{
"type": "null"
}
],
"title": "Top Size"
},
"bottom_size": {
"anyOf": [
{
"type": "string",
"maxLength": 10
},
{
"type": "null"
}
],
"title": "Bottom Size"
},
"shoes_size": {
"anyOf": [
{
"type": "string",
"maxLength": 10
},
{
"type": "null"
}
],
"title": "Shoes Size"
},
"is_foreigner": {
"anyOf": [
{
"type": "boolean"
},
{
"type": "null"
}
],
"title": "Is Foreigner"
},
"kakaotalk": {
"anyOf": [
{
"type": "string",
"maxLength": 100
},
{
"type": "null"
}
],
"title": "Kakaotalk"
},
"first_language": {
"anyOf": [
{
"type": "string",
"maxLength": 50
},
{
"type": "null"
}
],
"title": "First Language"
},
"korean_level": {
"anyOf": [
{
"$ref": "#/components/schemas/KoreanLevel"
},
{
"type": "null"
}
]
},
"visa_type": {
"anyOf": [
{
"$ref": "#/components/schemas/VisaType"
},
{
"type": "null"
}
]
}
},
"type": "object",
"required": [
"id"
],
"title": "UpdateGlobalModel"
},
"UserResponse": {
"properties": {
"id": {
"type": "string",
"format": "uuid",
"title": "Id",
"description": "사용자 고유 ID"
},
"name": {
"type": "string",
"title": "Name",
"description": "사용자 이름"
},
"pid": {
"type": "string",
"title": "Pid",
"description": "이메일"
},
"role": {
"$ref": "#/components/schemas/UserRole"
          },
          "provider": {
            "$ref": "#/components/schemas/Provider",
"description": "가입 경로"
},
"created_at": {
"type": "string",
"format": "date-time",
"title": "Created At",
"description": "가입일시"
}
},
"type": "object",
"required": [
"id",
"name",
"pid",
"role",
"provider",
"created_at"
],
"title": "UserResponse",
"description": "사용자 정보 응답"
},
"UserRole": {
"type": "string",
"enum": [
"ADMIN",
"DIRECTOR"
],
"title": "UserRole",
"description": "사용자 역할"
},
"ValidationError": {
"properties": {
"loc": {
"items": {
"anyOf": [
{
"type": "string"
},
{
"type": "integer"
}
]
},
"type": "array",
"title": "Location"
},
"msg": {
"type": "string",
"title": "Message"
},
"type": {
"type": "string",
"title": "Error Type"
}
},
"type": "object",
"required": [
"loc",
"msg",
"type"
],
"title": "ValidationError"
},
"VisaType": {
"type": "string",
"enum": [
"C1",
"C2",
"C3",
"C4",
"E1",
"E2",
"E3",
"E4",
"E5",
"E6",
"E7",
"E8",
"E9",
"E10",
"F1",
"F2",
"F3",
"F4",
"F5",
"F6",
"H1",
"H2",
"D1",
"D2",
"D3",
"D4",
"D5",
"D6",
"D7",
"D8",
"D9",
"D10",
"A1",
"A2",
"A3",
"B1",
"B2"
],
"title": "VisaType"
}
},
"securitySchemes": {
"HTTPBearer": {
"type": "http",
"scheme": "bearer"
}
}
}
}
