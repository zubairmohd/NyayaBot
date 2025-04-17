/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/upload";
exports.ids = ["pages/upload"];
exports.modules = {

/***/ "(pages-dir-node)/./components/document/DocumentUploader.js":
/*!*************************************************!*\
  !*** ./components/document/DocumentUploader.js ***!
  \*************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ DocumentUploader)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _barrel_optimize_names_Alert_Box_Button_CircularProgress_Collapse_Divider_IconButton_List_ListItem_ListItemText_Paper_Typography_mui_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! __barrel_optimize__?names=Alert,Box,Button,CircularProgress,Collapse,Divider,IconButton,List,ListItem,ListItemText,Paper,Typography!=!@mui/material */ \"(pages-dir-node)/__barrel_optimize__?names=Alert,Box,Button,CircularProgress,Collapse,Divider,IconButton,List,ListItem,ListItemText,Paper,Typography!=!./node_modules/@mui/material/esm/index.js\");\n/* harmony import */ var _mui_icons_material_CloudUpload__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/icons-material/CloudUpload */ \"(pages-dir-node)/./node_modules/@mui/icons-material/esm/CloudUpload.js\");\n/* harmony import */ var _mui_icons_material_PictureAsPdf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/icons-material/PictureAsPdf */ \"(pages-dir-node)/./node_modules/@mui/icons-material/esm/PictureAsPdf.js\");\n/* harmony import */ var _mui_icons_material_Close__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/icons-material/Close */ \"(pages-dir-node)/./node_modules/@mui/icons-material/esm/Close.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ \"axios\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_2__, _barrel_optimize_names_Alert_Box_Button_CircularProgress_Collapse_Divider_IconButton_List_ListItem_ListItemText_Paper_Typography_mui_material__WEBPACK_IMPORTED_MODULE_3__, _mui_icons_material_Close__WEBPACK_IMPORTED_MODULE_4__, _mui_icons_material_CloudUpload__WEBPACK_IMPORTED_MODULE_5__, _mui_icons_material_PictureAsPdf__WEBPACK_IMPORTED_MODULE_6__]);\n([axios__WEBPACK_IMPORTED_MODULE_2__, _barrel_optimize_names_Alert_Box_Button_CircularProgress_Collapse_Divider_IconButton_List_ListItem_ListItemText_Paper_Typography_mui_material__WEBPACK_IMPORTED_MODULE_3__, _mui_icons_material_Close__WEBPACK_IMPORTED_MODULE_4__, _mui_icons_material_CloudUpload__WEBPACK_IMPORTED_MODULE_5__, _mui_icons_material_PictureAsPdf__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\n\n\n\nfunction DocumentUploader() {\n    const [selectedFile, setSelectedFile] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [isUploading, setIsUploading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [uploadStatus, setUploadStatus] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [showAlert, setShowAlert] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [uploadedDocs, setUploadedDocs] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    // Handle file selection\n    const handleFileSelect = (event)=>{\n        const file = event.target.files[0];\n        // Check if a file was selected\n        if (!file) {\n            return;\n        }\n        // Check file type (only allow PDFs)\n        if (file.type !== 'application/pdf') {\n            setUploadStatus({\n                success: false,\n                message: 'Only PDF files are supported'\n            });\n            setShowAlert(true);\n            return;\n        }\n        // Check file size (limit to 10MB)\n        if (file.size > 10 * 1024 * 1024) {\n            setUploadStatus({\n                success: false,\n                message: 'File size exceeds 10MB limit'\n            });\n            setShowAlert(true);\n            return;\n        }\n        setSelectedFile(file);\n        setUploadStatus(null);\n        setShowAlert(false);\n    };\n    // Handle file upload\n    const handleUpload = async ()=>{\n        if (!selectedFile) {\n            return;\n        }\n        setIsUploading(true);\n        setUploadStatus(null);\n        try {\n            // Create form data for file upload\n            const formData = new FormData();\n            formData.append('document', selectedFile);\n            // Send file to API endpoint\n            const response = await axios__WEBPACK_IMPORTED_MODULE_2__[\"default\"].post('/api/upload-document', formData, {\n                headers: {\n                    'Content-Type': 'multipart/form-data'\n                }\n            });\n            if (response.data && response.data.success) {\n                // Upload successful\n                setUploadStatus({\n                    success: true,\n                    message: 'Document uploaded successfully'\n                });\n                // Add to uploaded documents list\n                setUploadedDocs((prev)=>[\n                        ...prev,\n                        {\n                            name: response.data.document.originalName,\n                            size: response.data.document.size,\n                            uploadedAt: new Date().toLocaleString()\n                        }\n                    ]);\n                // Reset selected file\n                setSelectedFile(null);\n            } else {\n                throw new Error(response.data?.error || 'Unknown error');\n            }\n        } catch (error) {\n            console.error('Error uploading document:', error);\n            setUploadStatus({\n                success: false,\n                message: `Upload failed: ${error.message}`\n            });\n        } finally{\n            setIsUploading(false);\n            setShowAlert(true);\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Alert_Box_Button_CircularProgress_Collapse_Divider_IconButton_List_ListItem_ListItemText_Paper_Typography_mui_material__WEBPACK_IMPORTED_MODULE_3__.Box, {\n        sx: {\n            display: 'flex',\n            flexDirection: 'column',\n            height: '100%',\n            maxWidth: '800px',\n            margin: '0 auto'\n        },\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Alert_Box_Button_CircularProgress_Collapse_Divider_IconButton_List_ListItem_ListItemText_Paper_Typography_mui_material__WEBPACK_IMPORTED_MODULE_3__.Paper, {\n                elevation: 2,\n                sx: {\n                    p: 3,\n                    mb: 3,\n                    borderRadius: 2\n                },\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Alert_Box_Button_CircularProgress_Collapse_Divider_IconButton_List_ListItem_ListItemText_Paper_Typography_mui_material__WEBPACK_IMPORTED_MODULE_3__.Typography, {\n                        variant: \"h6\",\n                        gutterBottom: true,\n                        children: \"Document Upload for AI Analysis\"\n                    }, void 0, false, {\n                        fileName: \"/home/runner/workspace/components/document/DocumentUploader.js\",\n                        lineNumber: 133,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Alert_Box_Button_CircularProgress_Collapse_Divider_IconButton_List_ListItem_ListItemText_Paper_Typography_mui_material__WEBPACK_IMPORTED_MODULE_3__.Typography, {\n                        variant: \"body2\",\n                        color: \"text.secondary\",\n                        sx: {\n                            mb: 3\n                        },\n                        children: \"Upload legal documents (PDF only) to enhance the AI's knowledge. The system will analyze the document and use it to provide more accurate answers to your questions.\"\n                    }, void 0, false, {\n                        fileName: \"/home/runner/workspace/components/document/DocumentUploader.js\",\n                        lineNumber: 137,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Alert_Box_Button_CircularProgress_Collapse_Divider_IconButton_List_ListItem_ListItemText_Paper_Typography_mui_material__WEBPACK_IMPORTED_MODULE_3__.Collapse, {\n                        in: showAlert,\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Alert_Box_Button_CircularProgress_Collapse_Divider_IconButton_List_ListItem_ListItemText_Paper_Typography_mui_material__WEBPACK_IMPORTED_MODULE_3__.Alert, {\n                            severity: uploadStatus?.success ? \"success\" : \"error\",\n                            action: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Alert_Box_Button_CircularProgress_Collapse_Divider_IconButton_List_ListItem_ListItemText_Paper_Typography_mui_material__WEBPACK_IMPORTED_MODULE_3__.IconButton, {\n                                \"aria-label\": \"close\",\n                                color: \"inherit\",\n                                size: \"small\",\n                                onClick: ()=>setShowAlert(false),\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_icons_material_Close__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                                    fontSize: \"inherit\"\n                                }, void 0, false, {\n                                    fileName: \"/home/runner/workspace/components/document/DocumentUploader.js\",\n                                    lineNumber: 152,\n                                    columnNumber: 17\n                                }, void 0)\n                            }, void 0, false, {\n                                fileName: \"/home/runner/workspace/components/document/DocumentUploader.js\",\n                                lineNumber: 146,\n                                columnNumber: 15\n                            }, void 0),\n                            sx: {\n                                mb: 2\n                            },\n                            children: uploadStatus?.message\n                        }, void 0, false, {\n                            fileName: \"/home/runner/workspace/components/document/DocumentUploader.js\",\n                            lineNumber: 143,\n                            columnNumber: 11\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"/home/runner/workspace/components/document/DocumentUploader.js\",\n                        lineNumber: 142,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Alert_Box_Button_CircularProgress_Collapse_Divider_IconButton_List_ListItem_ListItemText_Paper_Typography_mui_material__WEBPACK_IMPORTED_MODULE_3__.Box, {\n                        sx: {\n                            border: '2px dashed #ccc',\n                            borderRadius: 2,\n                            p: 3,\n                            textAlign: 'center',\n                            backgroundColor: '#f8f9fa',\n                            cursor: 'pointer',\n                            mb: 2,\n                            transition: 'all 0.3s',\n                            '&:hover': {\n                                borderColor: 'primary.main',\n                                backgroundColor: '#f0f7ff'\n                            }\n                        },\n                        onClick: ()=>document.getElementById('file-input').click(),\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                                id: \"file-input\",\n                                type: \"file\",\n                                accept: \".pdf\",\n                                onChange: handleFileSelect,\n                                style: {\n                                    display: 'none'\n                                }\n                            }, void 0, false, {\n                                fileName: \"/home/runner/workspace/components/document/DocumentUploader.js\",\n                                lineNumber: 178,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_icons_material_CloudUpload__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                                sx: {\n                                    fontSize: 48,\n                                    color: 'primary.main',\n                                    mb: 1\n                                }\n                            }, void 0, false, {\n                                fileName: \"/home/runner/workspace/components/document/DocumentUploader.js\",\n                                lineNumber: 186,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Alert_Box_Button_CircularProgress_Collapse_Divider_IconButton_List_ListItem_ListItemText_Paper_Typography_mui_material__WEBPACK_IMPORTED_MODULE_3__.Typography, {\n                                variant: \"body1\",\n                                gutterBottom: true,\n                                children: selectedFile ? selectedFile.name : 'Click to select or drag & drop a PDF file'\n                            }, void 0, false, {\n                                fileName: \"/home/runner/workspace/components/document/DocumentUploader.js\",\n                                lineNumber: 188,\n                                columnNumber: 11\n                            }, this),\n                            selectedFile && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Alert_Box_Button_CircularProgress_Collapse_Divider_IconButton_List_ListItem_ListItemText_Paper_Typography_mui_material__WEBPACK_IMPORTED_MODULE_3__.Typography, {\n                                variant: \"body2\",\n                                color: \"text.secondary\",\n                                children: [\n                                    (selectedFile.size / 1024 / 1024).toFixed(2),\n                                    \" MB\"\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/home/runner/workspace/components/document/DocumentUploader.js\",\n                                lineNumber: 193,\n                                columnNumber: 13\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/home/runner/workspace/components/document/DocumentUploader.js\",\n                        lineNumber: 161,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Alert_Box_Button_CircularProgress_Collapse_Divider_IconButton_List_ListItem_ListItemText_Paper_Typography_mui_material__WEBPACK_IMPORTED_MODULE_3__.Button, {\n                        variant: \"contained\",\n                        color: \"primary\",\n                        fullWidth: true,\n                        disabled: !selectedFile || isUploading,\n                        onClick: handleUpload,\n                        startIcon: isUploading ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Alert_Box_Button_CircularProgress_Collapse_Divider_IconButton_List_ListItem_ListItemText_Paper_Typography_mui_material__WEBPACK_IMPORTED_MODULE_3__.CircularProgress, {\n                            size: 24,\n                            color: \"inherit\"\n                        }, void 0, false, {\n                            fileName: \"/home/runner/workspace/components/document/DocumentUploader.js\",\n                            lineNumber: 205,\n                            columnNumber: 36\n                        }, void 0) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_icons_material_PictureAsPdf__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {}, void 0, false, {\n                            fileName: \"/home/runner/workspace/components/document/DocumentUploader.js\",\n                            lineNumber: 205,\n                            columnNumber: 85\n                        }, void 0),\n                        sx: {\n                            py: 1.5\n                        },\n                        children: isUploading ? 'Uploading...' : 'Upload Document'\n                    }, void 0, false, {\n                        fileName: \"/home/runner/workspace/components/document/DocumentUploader.js\",\n                        lineNumber: 199,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/home/runner/workspace/components/document/DocumentUploader.js\",\n                lineNumber: 125,\n                columnNumber: 7\n            }, this),\n            uploadedDocs.length > 0 && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Alert_Box_Button_CircularProgress_Collapse_Divider_IconButton_List_ListItem_ListItemText_Paper_Typography_mui_material__WEBPACK_IMPORTED_MODULE_3__.Paper, {\n                elevation: 2,\n                sx: {\n                    p: 3,\n                    borderRadius: 2\n                },\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Alert_Box_Button_CircularProgress_Collapse_Divider_IconButton_List_ListItem_ListItemText_Paper_Typography_mui_material__WEBPACK_IMPORTED_MODULE_3__.Typography, {\n                        variant: \"h6\",\n                        gutterBottom: true,\n                        children: \"Uploaded Documents\"\n                    }, void 0, false, {\n                        fileName: \"/home/runner/workspace/components/document/DocumentUploader.js\",\n                        lineNumber: 221,\n                        columnNumber: 11\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Alert_Box_Button_CircularProgress_Collapse_Divider_IconButton_List_ListItem_ListItemText_Paper_Typography_mui_material__WEBPACK_IMPORTED_MODULE_3__.List, {\n                        children: uploadedDocs.map((doc, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Alert_Box_Button_CircularProgress_Collapse_Divider_IconButton_List_ListItem_ListItemText_Paper_Typography_mui_material__WEBPACK_IMPORTED_MODULE_3__.Box, {\n                                children: [\n                                    index > 0 && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Alert_Box_Button_CircularProgress_Collapse_Divider_IconButton_List_ListItem_ListItemText_Paper_Typography_mui_material__WEBPACK_IMPORTED_MODULE_3__.Divider, {\n                                        component: \"li\"\n                                    }, void 0, false, {\n                                        fileName: \"/home/runner/workspace/components/document/DocumentUploader.js\",\n                                        lineNumber: 228,\n                                        columnNumber: 31\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Alert_Box_Button_CircularProgress_Collapse_Divider_IconButton_List_ListItem_ListItemText_Paper_Typography_mui_material__WEBPACK_IMPORTED_MODULE_3__.ListItem, {\n                                        children: [\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_icons_material_PictureAsPdf__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n                                                sx: {\n                                                    mr: 2,\n                                                    color: 'error.light'\n                                                }\n                                            }, void 0, false, {\n                                                fileName: \"/home/runner/workspace/components/document/DocumentUploader.js\",\n                                                lineNumber: 230,\n                                                columnNumber: 19\n                                            }, this),\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Alert_Box_Button_CircularProgress_Collapse_Divider_IconButton_List_ListItem_ListItemText_Paper_Typography_mui_material__WEBPACK_IMPORTED_MODULE_3__.ListItemText, {\n                                                primary: doc.name,\n                                                secondary: `${(doc.size / 1024 / 1024).toFixed(2)} MB • Uploaded on ${doc.uploadedAt}`\n                                            }, void 0, false, {\n                                                fileName: \"/home/runner/workspace/components/document/DocumentUploader.js\",\n                                                lineNumber: 231,\n                                                columnNumber: 19\n                                            }, this)\n                                        ]\n                                    }, void 0, true, {\n                                        fileName: \"/home/runner/workspace/components/document/DocumentUploader.js\",\n                                        lineNumber: 229,\n                                        columnNumber: 17\n                                    }, this)\n                                ]\n                            }, index, true, {\n                                fileName: \"/home/runner/workspace/components/document/DocumentUploader.js\",\n                                lineNumber: 227,\n                                columnNumber: 15\n                            }, this))\n                    }, void 0, false, {\n                        fileName: \"/home/runner/workspace/components/document/DocumentUploader.js\",\n                        lineNumber: 225,\n                        columnNumber: 11\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/home/runner/workspace/components/document/DocumentUploader.js\",\n                lineNumber: 214,\n                columnNumber: 9\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/home/runner/workspace/components/document/DocumentUploader.js\",\n        lineNumber: 118,\n        columnNumber: 5\n    }, this);\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL2NvbXBvbmVudHMvZG9jdW1lbnQvRG9jdW1lbnRVcGxvYWRlci5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFpQztBQWNWO0FBQ3VDO0FBQ0U7QUFDZDtBQUN4QjtBQUVYLFNBQVNpQjtJQUN0QixNQUFNLENBQUNDLGNBQWNDLGdCQUFnQixHQUFHbkIsK0NBQVFBLENBQUM7SUFDakQsTUFBTSxDQUFDb0IsYUFBYUMsZUFBZSxHQUFHckIsK0NBQVFBLENBQUM7SUFDL0MsTUFBTSxDQUFDc0IsY0FBY0MsZ0JBQWdCLEdBQUd2QiwrQ0FBUUEsQ0FBQztJQUNqRCxNQUFNLENBQUN3QixXQUFXQyxhQUFhLEdBQUd6QiwrQ0FBUUEsQ0FBQztJQUMzQyxNQUFNLENBQUMwQixjQUFjQyxnQkFBZ0IsR0FBRzNCLCtDQUFRQSxDQUFDLEVBQUU7SUFFbkQsd0JBQXdCO0lBQ3hCLE1BQU00QixtQkFBbUIsQ0FBQ0M7UUFDeEIsTUFBTUMsT0FBT0QsTUFBTUUsTUFBTSxDQUFDQyxLQUFLLENBQUMsRUFBRTtRQUVsQywrQkFBK0I7UUFDL0IsSUFBSSxDQUFDRixNQUFNO1lBQ1Q7UUFDRjtRQUVBLG9DQUFvQztRQUNwQyxJQUFJQSxLQUFLRyxJQUFJLEtBQUssbUJBQW1CO1lBQ25DVixnQkFBZ0I7Z0JBQ2RXLFNBQVM7Z0JBQ1RDLFNBQVM7WUFDWDtZQUNBVixhQUFhO1lBQ2I7UUFDRjtRQUVBLGtDQUFrQztRQUNsQyxJQUFJSyxLQUFLTSxJQUFJLEdBQUcsS0FBSyxPQUFPLE1BQU07WUFDaENiLGdCQUFnQjtnQkFDZFcsU0FBUztnQkFDVEMsU0FBUztZQUNYO1lBQ0FWLGFBQWE7WUFDYjtRQUNGO1FBRUFOLGdCQUFnQlc7UUFDaEJQLGdCQUFnQjtRQUNoQkUsYUFBYTtJQUNmO0lBRUEscUJBQXFCO0lBQ3JCLE1BQU1ZLGVBQWU7UUFDbkIsSUFBSSxDQUFDbkIsY0FBYztZQUNqQjtRQUNGO1FBRUFHLGVBQWU7UUFDZkUsZ0JBQWdCO1FBRWhCLElBQUk7WUFDRixtQ0FBbUM7WUFDbkMsTUFBTWUsV0FBVyxJQUFJQztZQUNyQkQsU0FBU0UsTUFBTSxDQUFDLFlBQVl0QjtZQUU1Qiw0QkFBNEI7WUFDNUIsTUFBTXVCLFdBQVcsTUFBTXpCLGtEQUFVLENBQUMsd0JBQXdCc0IsVUFBVTtnQkFDbEVLLFNBQVM7b0JBQ1AsZ0JBQWdCO2dCQUNsQjtZQUNGO1lBRUEsSUFBSUYsU0FBU0csSUFBSSxJQUFJSCxTQUFTRyxJQUFJLENBQUNWLE9BQU8sRUFBRTtnQkFDMUMsb0JBQW9CO2dCQUNwQlgsZ0JBQWdCO29CQUNkVyxTQUFTO29CQUNUQyxTQUFTO2dCQUNYO2dCQUVBLGlDQUFpQztnQkFDakNSLGdCQUFnQmtCLENBQUFBLE9BQVE7MkJBQ25CQTt3QkFDSDs0QkFDRUMsTUFBTUwsU0FBU0csSUFBSSxDQUFDRyxRQUFRLENBQUNDLFlBQVk7NEJBQ3pDWixNQUFNSyxTQUFTRyxJQUFJLENBQUNHLFFBQVEsQ0FBQ1gsSUFBSTs0QkFDakNhLFlBQVksSUFBSUMsT0FBT0MsY0FBYzt3QkFDdkM7cUJBQ0Q7Z0JBRUQsc0JBQXNCO2dCQUN0QmhDLGdCQUFnQjtZQUNsQixPQUFPO2dCQUNMLE1BQU0sSUFBSWlDLE1BQU1YLFNBQVNHLElBQUksRUFBRVMsU0FBUztZQUMxQztRQUNGLEVBQUUsT0FBT0EsT0FBTztZQUNkQyxRQUFRRCxLQUFLLENBQUMsNkJBQTZCQTtZQUMzQzlCLGdCQUFnQjtnQkFDZFcsU0FBUztnQkFDVEMsU0FBUyxDQUFDLGVBQWUsRUFBRWtCLE1BQU1sQixPQUFPLEVBQUU7WUFDNUM7UUFDRixTQUFVO1lBQ1JkLGVBQWU7WUFDZkksYUFBYTtRQUNmO0lBQ0Y7SUFFQSxxQkFDRSw4REFBQ3hCLDhLQUFHQTtRQUFDc0QsSUFBSTtZQUNQQyxTQUFTO1lBQ1RDLGVBQWU7WUFDZkMsUUFBUTtZQUNSQyxVQUFVO1lBQ1ZDLFFBQVE7UUFDVjs7MEJBQ0UsOERBQUN6RCxnTEFBS0E7Z0JBQ0owRCxXQUFXO2dCQUNYTixJQUFJO29CQUNGTyxHQUFHO29CQUNIQyxJQUFJO29CQUNKQyxjQUFjO2dCQUNoQjs7a0NBRUEsOERBQUM1RCxxTEFBVUE7d0JBQUM2RCxTQUFRO3dCQUFLQyxZQUFZO2tDQUFDOzs7Ozs7a0NBSXRDLDhEQUFDOUQscUxBQVVBO3dCQUFDNkQsU0FBUTt3QkFBUUUsT0FBTTt3QkFBaUJaLElBQUk7NEJBQUVRLElBQUk7d0JBQUU7a0NBQUc7Ozs7OztrQ0FLbEUsOERBQUN2RCxtTEFBUUE7d0JBQUM0RCxJQUFJNUM7a0NBQ1osNEVBQUNsQixnTEFBS0E7NEJBQ0orRCxVQUFVL0MsY0FBY1ksVUFBVSxZQUFZOzRCQUM5Q29DLHNCQUNFLDhEQUFDL0QscUxBQVVBO2dDQUNUZ0UsY0FBVztnQ0FDWEosT0FBTTtnQ0FDTi9CLE1BQUs7Z0NBQ0xvQyxTQUFTLElBQU0vQyxhQUFhOzBDQUU1Qiw0RUFBQ1YsaUVBQVNBO29DQUFDMEQsVUFBUzs7Ozs7Ozs7Ozs7NEJBR3hCbEIsSUFBSTtnQ0FBRVEsSUFBSTs0QkFBRTtzQ0FFWHpDLGNBQWNhOzs7Ozs7Ozs7OztrQ0FJbkIsOERBQUNsQyw4S0FBR0E7d0JBQ0ZzRCxJQUFJOzRCQUNGbUIsUUFBUTs0QkFDUlYsY0FBYzs0QkFDZEYsR0FBRzs0QkFDSGEsV0FBVzs0QkFDWEMsaUJBQWlCOzRCQUNqQkMsUUFBUTs0QkFDUmQsSUFBSTs0QkFDSmUsWUFBWTs0QkFDWixXQUFXO2dDQUNUQyxhQUFhO2dDQUNiSCxpQkFBaUI7NEJBQ25CO3dCQUNGO3dCQUNBSixTQUFTLElBQU16QixTQUFTaUMsY0FBYyxDQUFDLGNBQWNDLEtBQUs7OzBDQUUxRCw4REFBQ0M7Z0NBQ0NDLElBQUc7Z0NBQ0hsRCxNQUFLO2dDQUNMbUQsUUFBTztnQ0FDUEMsVUFBVXpEO2dDQUNWMEQsT0FBTztvQ0FBRTlCLFNBQVM7Z0NBQU87Ozs7OzswQ0FHM0IsOERBQUMzQyx1RUFBZUE7Z0NBQUMwQyxJQUFJO29DQUFFa0IsVUFBVTtvQ0FBSU4sT0FBTztvQ0FBZ0JKLElBQUk7Z0NBQUU7Ozs7OzswQ0FFbEUsOERBQUMzRCxxTEFBVUE7Z0NBQUM2RCxTQUFRO2dDQUFRQyxZQUFZOzBDQUNyQ2hELGVBQWVBLGFBQWE0QixJQUFJLEdBQUc7Ozs7Ozs0QkFHckM1Qiw4QkFDQyw4REFBQ2QscUxBQVVBO2dDQUFDNkQsU0FBUTtnQ0FBUUUsT0FBTTs7b0NBQzlCakQsQ0FBQUEsYUFBYWtCLElBQUksR0FBRyxPQUFPLElBQUcsRUFBR21ELE9BQU8sQ0FBQztvQ0FBRzs7Ozs7Ozs7Ozs7OztrQ0FLcEQsOERBQUNyRixpTEFBTUE7d0JBQ0wrRCxTQUFRO3dCQUNSRSxPQUFNO3dCQUNOcUIsU0FBUzt3QkFDVEMsVUFBVSxDQUFDdkUsZ0JBQWdCRTt3QkFDM0JvRCxTQUFTbkM7d0JBQ1RxRCxXQUFXdEUsNEJBQWMsOERBQUNmLDJMQUFnQkE7NEJBQUMrQixNQUFNOzRCQUFJK0IsT0FBTTs7Ozs7bURBQWUsOERBQUNyRCx3RUFBZ0JBOzs7Ozt3QkFDM0Z5QyxJQUFJOzRCQUFFb0MsSUFBSTt3QkFBSTtrQ0FFYnZFLGNBQWMsaUJBQWlCOzs7Ozs7Ozs7Ozs7WUFLbkNNLGFBQWFrRSxNQUFNLEdBQUcsbUJBQ3JCLDhEQUFDekYsZ0xBQUtBO2dCQUNKMEQsV0FBVztnQkFDWE4sSUFBSTtvQkFDRk8sR0FBRztvQkFDSEUsY0FBYztnQkFDaEI7O2tDQUVBLDhEQUFDNUQscUxBQVVBO3dCQUFDNkQsU0FBUTt3QkFBS0MsWUFBWTtrQ0FBQzs7Ozs7O2tDQUl0Qyw4REFBQ3pELCtLQUFJQTtrQ0FDRmlCLGFBQWFtRSxHQUFHLENBQUMsQ0FBQ0MsS0FBS0Msc0JBQ3RCLDhEQUFDOUYsOEtBQUdBOztvQ0FDRDhGLFFBQVEsbUJBQUssOERBQUNuRixrTEFBT0E7d0NBQUNvRixXQUFVOzs7Ozs7a0RBQ2pDLDhEQUFDdEYsbUxBQVFBOzswREFDUCw4REFBQ0ksd0VBQWdCQTtnREFBQ3lDLElBQUk7b0RBQUUwQyxJQUFJO29EQUFHOUIsT0FBTztnREFBYzs7Ozs7OzBEQUNwRCw4REFBQ3hELHVMQUFZQTtnREFDWHVGLFNBQVNKLElBQUloRCxJQUFJO2dEQUNqQnFELFdBQVcsR0FBRyxDQUFDTCxJQUFJMUQsSUFBSSxHQUFHLE9BQU8sSUFBRyxFQUFHbUQsT0FBTyxDQUFDLEdBQUcsa0JBQWtCLEVBQUVPLElBQUk3QyxVQUFVLEVBQUU7Ozs7Ozs7Ozs7Ozs7K0JBTmxGOEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQnhCIiwic291cmNlcyI6WyIvaG9tZS9ydW5uZXIvd29ya3NwYWNlL2NvbXBvbmVudHMvZG9jdW1lbnQvRG9jdW1lbnRVcGxvYWRlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFxuICBCb3gsIFxuICBCdXR0b24sIFxuICBQYXBlciwgXG4gIFR5cG9ncmFwaHksIFxuICBDaXJjdWxhclByb2dyZXNzLFxuICBBbGVydCxcbiAgSWNvbkJ1dHRvbixcbiAgQ29sbGFwc2UsXG4gIExpc3QsXG4gIExpc3RJdGVtLFxuICBMaXN0SXRlbVRleHQsXG4gIERpdmlkZXJcbn0gZnJvbSAnQG11aS9tYXRlcmlhbCc7XG5pbXBvcnQgQ2xvdWRVcGxvYWRJY29uIGZyb20gJ0BtdWkvaWNvbnMtbWF0ZXJpYWwvQ2xvdWRVcGxvYWQnO1xuaW1wb3J0IFBpY3R1cmVBc1BkZkljb24gZnJvbSAnQG11aS9pY29ucy1tYXRlcmlhbC9QaWN0dXJlQXNQZGYnO1xuaW1wb3J0IENsb3NlSWNvbiBmcm9tICdAbXVpL2ljb25zLW1hdGVyaWFsL0Nsb3NlJztcbmltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIERvY3VtZW50VXBsb2FkZXIoKSB7XG4gIGNvbnN0IFtzZWxlY3RlZEZpbGUsIHNldFNlbGVjdGVkRmlsZV0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW2lzVXBsb2FkaW5nLCBzZXRJc1VwbG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFt1cGxvYWRTdGF0dXMsIHNldFVwbG9hZFN0YXR1c10gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW3Nob3dBbGVydCwgc2V0U2hvd0FsZXJ0XSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3VwbG9hZGVkRG9jcywgc2V0VXBsb2FkZWREb2NzXSA9IHVzZVN0YXRlKFtdKTtcblxuICAvLyBIYW5kbGUgZmlsZSBzZWxlY3Rpb25cbiAgY29uc3QgaGFuZGxlRmlsZVNlbGVjdCA9IChldmVudCkgPT4ge1xuICAgIGNvbnN0IGZpbGUgPSBldmVudC50YXJnZXQuZmlsZXNbMF07XG4gICAgXG4gICAgLy8gQ2hlY2sgaWYgYSBmaWxlIHdhcyBzZWxlY3RlZFxuICAgIGlmICghZmlsZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBcbiAgICAvLyBDaGVjayBmaWxlIHR5cGUgKG9ubHkgYWxsb3cgUERGcylcbiAgICBpZiAoZmlsZS50eXBlICE9PSAnYXBwbGljYXRpb24vcGRmJykge1xuICAgICAgc2V0VXBsb2FkU3RhdHVzKHtcbiAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgIG1lc3NhZ2U6ICdPbmx5IFBERiBmaWxlcyBhcmUgc3VwcG9ydGVkJ1xuICAgICAgfSk7XG4gICAgICBzZXRTaG93QWxlcnQodHJ1ZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIFxuICAgIC8vIENoZWNrIGZpbGUgc2l6ZSAobGltaXQgdG8gMTBNQilcbiAgICBpZiAoZmlsZS5zaXplID4gMTAgKiAxMDI0ICogMTAyNCkge1xuICAgICAgc2V0VXBsb2FkU3RhdHVzKHtcbiAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgIG1lc3NhZ2U6ICdGaWxlIHNpemUgZXhjZWVkcyAxME1CIGxpbWl0J1xuICAgICAgfSk7XG4gICAgICBzZXRTaG93QWxlcnQodHJ1ZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIFxuICAgIHNldFNlbGVjdGVkRmlsZShmaWxlKTtcbiAgICBzZXRVcGxvYWRTdGF0dXMobnVsbCk7XG4gICAgc2V0U2hvd0FsZXJ0KGZhbHNlKTtcbiAgfTtcblxuICAvLyBIYW5kbGUgZmlsZSB1cGxvYWRcbiAgY29uc3QgaGFuZGxlVXBsb2FkID0gYXN5bmMgKCkgPT4ge1xuICAgIGlmICghc2VsZWN0ZWRGaWxlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIFxuICAgIHNldElzVXBsb2FkaW5nKHRydWUpO1xuICAgIHNldFVwbG9hZFN0YXR1cyhudWxsKTtcbiAgICBcbiAgICB0cnkge1xuICAgICAgLy8gQ3JlYXRlIGZvcm0gZGF0YSBmb3IgZmlsZSB1cGxvYWRcbiAgICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICBmb3JtRGF0YS5hcHBlbmQoJ2RvY3VtZW50Jywgc2VsZWN0ZWRGaWxlKTtcbiAgICAgIFxuICAgICAgLy8gU2VuZCBmaWxlIHRvIEFQSSBlbmRwb2ludFxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBheGlvcy5wb3N0KCcvYXBpL3VwbG9hZC1kb2N1bWVudCcsIGZvcm1EYXRhLCB7XG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ211bHRpcGFydC9mb3JtLWRhdGEnXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgXG4gICAgICBpZiAocmVzcG9uc2UuZGF0YSAmJiByZXNwb25zZS5kYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgLy8gVXBsb2FkIHN1Y2Nlc3NmdWxcbiAgICAgICAgc2V0VXBsb2FkU3RhdHVzKHtcbiAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICAgIG1lc3NhZ2U6ICdEb2N1bWVudCB1cGxvYWRlZCBzdWNjZXNzZnVsbHknXG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgLy8gQWRkIHRvIHVwbG9hZGVkIGRvY3VtZW50cyBsaXN0XG4gICAgICAgIHNldFVwbG9hZGVkRG9jcyhwcmV2ID0+IFtcbiAgICAgICAgICAuLi5wcmV2LCBcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiByZXNwb25zZS5kYXRhLmRvY3VtZW50Lm9yaWdpbmFsTmFtZSxcbiAgICAgICAgICAgIHNpemU6IHJlc3BvbnNlLmRhdGEuZG9jdW1lbnQuc2l6ZSxcbiAgICAgICAgICAgIHVwbG9hZGVkQXQ6IG5ldyBEYXRlKCkudG9Mb2NhbGVTdHJpbmcoKVxuICAgICAgICAgIH1cbiAgICAgICAgXSk7XG4gICAgICAgIFxuICAgICAgICAvLyBSZXNldCBzZWxlY3RlZCBmaWxlXG4gICAgICAgIHNldFNlbGVjdGVkRmlsZShudWxsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihyZXNwb25zZS5kYXRhPy5lcnJvciB8fCAnVW5rbm93biBlcnJvcicpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciB1cGxvYWRpbmcgZG9jdW1lbnQ6JywgZXJyb3IpO1xuICAgICAgc2V0VXBsb2FkU3RhdHVzKHtcbiAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgIG1lc3NhZ2U6IGBVcGxvYWQgZmFpbGVkOiAke2Vycm9yLm1lc3NhZ2V9YFxuICAgICAgfSk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldElzVXBsb2FkaW5nKGZhbHNlKTtcbiAgICAgIHNldFNob3dBbGVydCh0cnVlKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8Qm94IHN4PXt7IFxuICAgICAgZGlzcGxheTogJ2ZsZXgnLCBcbiAgICAgIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLCBcbiAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgICAgbWF4V2lkdGg6ICc4MDBweCcsXG4gICAgICBtYXJnaW46ICcwIGF1dG8nXG4gICAgfX0+XG4gICAgICA8UGFwZXIgXG4gICAgICAgIGVsZXZhdGlvbj17Mn0gXG4gICAgICAgIHN4PXt7IFxuICAgICAgICAgIHA6IDMsIFxuICAgICAgICAgIG1iOiAzLFxuICAgICAgICAgIGJvcmRlclJhZGl1czogMlxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICA8VHlwb2dyYXBoeSB2YXJpYW50PVwiaDZcIiBndXR0ZXJCb3R0b20+XG4gICAgICAgICAgRG9jdW1lbnQgVXBsb2FkIGZvciBBSSBBbmFseXNpc1xuICAgICAgICA8L1R5cG9ncmFwaHk+XG4gICAgICAgIFxuICAgICAgICA8VHlwb2dyYXBoeSB2YXJpYW50PVwiYm9keTJcIiBjb2xvcj1cInRleHQuc2Vjb25kYXJ5XCIgc3g9e3sgbWI6IDMgfX0+XG4gICAgICAgICAgVXBsb2FkIGxlZ2FsIGRvY3VtZW50cyAoUERGIG9ubHkpIHRvIGVuaGFuY2UgdGhlIEFJJ3Mga25vd2xlZGdlLiBcbiAgICAgICAgICBUaGUgc3lzdGVtIHdpbGwgYW5hbHl6ZSB0aGUgZG9jdW1lbnQgYW5kIHVzZSBpdCB0byBwcm92aWRlIG1vcmUgYWNjdXJhdGUgYW5zd2VycyB0byB5b3VyIHF1ZXN0aW9ucy5cbiAgICAgICAgPC9UeXBvZ3JhcGh5PlxuICAgICAgICBcbiAgICAgICAgPENvbGxhcHNlIGluPXtzaG93QWxlcnR9PlxuICAgICAgICAgIDxBbGVydCBcbiAgICAgICAgICAgIHNldmVyaXR5PXt1cGxvYWRTdGF0dXM/LnN1Y2Nlc3MgPyBcInN1Y2Nlc3NcIiA6IFwiZXJyb3JcIn1cbiAgICAgICAgICAgIGFjdGlvbj17XG4gICAgICAgICAgICAgIDxJY29uQnV0dG9uXG4gICAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cImNsb3NlXCJcbiAgICAgICAgICAgICAgICBjb2xvcj1cImluaGVyaXRcIlxuICAgICAgICAgICAgICAgIHNpemU9XCJzbWFsbFwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U2hvd0FsZXJ0KGZhbHNlKX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxDbG9zZUljb24gZm9udFNpemU9XCJpbmhlcml0XCIgLz5cbiAgICAgICAgICAgICAgPC9JY29uQnV0dG9uPlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3g9e3sgbWI6IDIgfX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7dXBsb2FkU3RhdHVzPy5tZXNzYWdlfVxuICAgICAgICAgIDwvQWxlcnQ+XG4gICAgICAgIDwvQ29sbGFwc2U+XG4gICAgICAgIFxuICAgICAgICA8Qm94IFxuICAgICAgICAgIHN4PXt7IFxuICAgICAgICAgICAgYm9yZGVyOiAnMnB4IGRhc2hlZCAjY2NjJywgXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6IDIsIFxuICAgICAgICAgICAgcDogMywgXG4gICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnI2Y4ZjlmYScsXG4gICAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJyxcbiAgICAgICAgICAgIG1iOiAyLFxuICAgICAgICAgICAgdHJhbnNpdGlvbjogJ2FsbCAwLjNzJyxcbiAgICAgICAgICAgICcmOmhvdmVyJzoge1xuICAgICAgICAgICAgICBib3JkZXJDb2xvcjogJ3ByaW1hcnkubWFpbicsXG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNmMGY3ZmYnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfX1cbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmlsZS1pbnB1dCcpLmNsaWNrKCl9XG4gICAgICAgID5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIGlkPVwiZmlsZS1pbnB1dFwiXG4gICAgICAgICAgICB0eXBlPVwiZmlsZVwiXG4gICAgICAgICAgICBhY2NlcHQ9XCIucGRmXCJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVGaWxlU2VsZWN0fVxuICAgICAgICAgICAgc3R5bGU9e3sgZGlzcGxheTogJ25vbmUnIH19XG4gICAgICAgICAgLz5cbiAgICAgICAgICBcbiAgICAgICAgICA8Q2xvdWRVcGxvYWRJY29uIHN4PXt7IGZvbnRTaXplOiA0OCwgY29sb3I6ICdwcmltYXJ5Lm1haW4nLCBtYjogMSB9fSAvPlxuICAgICAgICAgIFxuICAgICAgICAgIDxUeXBvZ3JhcGh5IHZhcmlhbnQ9XCJib2R5MVwiIGd1dHRlckJvdHRvbT5cbiAgICAgICAgICAgIHtzZWxlY3RlZEZpbGUgPyBzZWxlY3RlZEZpbGUubmFtZSA6ICdDbGljayB0byBzZWxlY3Qgb3IgZHJhZyAmIGRyb3AgYSBQREYgZmlsZSd9XG4gICAgICAgICAgPC9UeXBvZ3JhcGh5PlxuICAgICAgICAgIFxuICAgICAgICAgIHtzZWxlY3RlZEZpbGUgJiYgKFxuICAgICAgICAgICAgPFR5cG9ncmFwaHkgdmFyaWFudD1cImJvZHkyXCIgY29sb3I9XCJ0ZXh0LnNlY29uZGFyeVwiPlxuICAgICAgICAgICAgICB7KHNlbGVjdGVkRmlsZS5zaXplIC8gMTAyNCAvIDEwMjQpLnRvRml4ZWQoMil9IE1CXG4gICAgICAgICAgICA8L1R5cG9ncmFwaHk+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9Cb3g+XG4gICAgICAgIFxuICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgdmFyaWFudD1cImNvbnRhaW5lZFwiXG4gICAgICAgICAgY29sb3I9XCJwcmltYXJ5XCJcbiAgICAgICAgICBmdWxsV2lkdGhcbiAgICAgICAgICBkaXNhYmxlZD17IXNlbGVjdGVkRmlsZSB8fCBpc1VwbG9hZGluZ31cbiAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVVcGxvYWR9XG4gICAgICAgICAgc3RhcnRJY29uPXtpc1VwbG9hZGluZyA/IDxDaXJjdWxhclByb2dyZXNzIHNpemU9ezI0fSBjb2xvcj1cImluaGVyaXRcIiAvPiA6IDxQaWN0dXJlQXNQZGZJY29uIC8+fVxuICAgICAgICAgIHN4PXt7IHB5OiAxLjUgfX1cbiAgICAgICAgPlxuICAgICAgICAgIHtpc1VwbG9hZGluZyA/ICdVcGxvYWRpbmcuLi4nIDogJ1VwbG9hZCBEb2N1bWVudCd9XG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgPC9QYXBlcj5cbiAgICAgIFxuICAgICAgey8qIFVwbG9hZGVkIERvY3VtZW50cyBMaXN0ICovfVxuICAgICAge3VwbG9hZGVkRG9jcy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgPFBhcGVyIFxuICAgICAgICAgIGVsZXZhdGlvbj17Mn0gXG4gICAgICAgICAgc3g9e3sgXG4gICAgICAgICAgICBwOiAzLCBcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogMlxuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICA8VHlwb2dyYXBoeSB2YXJpYW50PVwiaDZcIiBndXR0ZXJCb3R0b20+XG4gICAgICAgICAgICBVcGxvYWRlZCBEb2N1bWVudHNcbiAgICAgICAgICA8L1R5cG9ncmFwaHk+XG4gICAgICAgICAgXG4gICAgICAgICAgPExpc3Q+XG4gICAgICAgICAgICB7dXBsb2FkZWREb2NzLm1hcCgoZG9jLCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgICA8Qm94IGtleT17aW5kZXh9PlxuICAgICAgICAgICAgICAgIHtpbmRleCA+IDAgJiYgPERpdmlkZXIgY29tcG9uZW50PVwibGlcIiAvPn1cbiAgICAgICAgICAgICAgICA8TGlzdEl0ZW0+XG4gICAgICAgICAgICAgICAgICA8UGljdHVyZUFzUGRmSWNvbiBzeD17eyBtcjogMiwgY29sb3I6ICdlcnJvci5saWdodCcgfX0gLz5cbiAgICAgICAgICAgICAgICAgIDxMaXN0SXRlbVRleHRcbiAgICAgICAgICAgICAgICAgICAgcHJpbWFyeT17ZG9jLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgIHNlY29uZGFyeT17YCR7KGRvYy5zaXplIC8gMTAyNCAvIDEwMjQpLnRvRml4ZWQoMil9IE1CIOKAoiBVcGxvYWRlZCBvbiAke2RvYy51cGxvYWRlZEF0fWB9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvTGlzdEl0ZW0+XG4gICAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAgPC9MaXN0PlxuICAgICAgICA8L1BhcGVyPlxuICAgICAgKX1cbiAgICA8L0JveD5cbiAgKTtcbn0iXSwibmFtZXMiOlsidXNlU3RhdGUiLCJCb3giLCJCdXR0b24iLCJQYXBlciIsIlR5cG9ncmFwaHkiLCJDaXJjdWxhclByb2dyZXNzIiwiQWxlcnQiLCJJY29uQnV0dG9uIiwiQ29sbGFwc2UiLCJMaXN0IiwiTGlzdEl0ZW0iLCJMaXN0SXRlbVRleHQiLCJEaXZpZGVyIiwiQ2xvdWRVcGxvYWRJY29uIiwiUGljdHVyZUFzUGRmSWNvbiIsIkNsb3NlSWNvbiIsImF4aW9zIiwiRG9jdW1lbnRVcGxvYWRlciIsInNlbGVjdGVkRmlsZSIsInNldFNlbGVjdGVkRmlsZSIsImlzVXBsb2FkaW5nIiwic2V0SXNVcGxvYWRpbmciLCJ1cGxvYWRTdGF0dXMiLCJzZXRVcGxvYWRTdGF0dXMiLCJzaG93QWxlcnQiLCJzZXRTaG93QWxlcnQiLCJ1cGxvYWRlZERvY3MiLCJzZXRVcGxvYWRlZERvY3MiLCJoYW5kbGVGaWxlU2VsZWN0IiwiZXZlbnQiLCJmaWxlIiwidGFyZ2V0IiwiZmlsZXMiLCJ0eXBlIiwic3VjY2VzcyIsIm1lc3NhZ2UiLCJzaXplIiwiaGFuZGxlVXBsb2FkIiwiZm9ybURhdGEiLCJGb3JtRGF0YSIsImFwcGVuZCIsInJlc3BvbnNlIiwicG9zdCIsImhlYWRlcnMiLCJkYXRhIiwicHJldiIsIm5hbWUiLCJkb2N1bWVudCIsIm9yaWdpbmFsTmFtZSIsInVwbG9hZGVkQXQiLCJEYXRlIiwidG9Mb2NhbGVTdHJpbmciLCJFcnJvciIsImVycm9yIiwiY29uc29sZSIsInN4IiwiZGlzcGxheSIsImZsZXhEaXJlY3Rpb24iLCJoZWlnaHQiLCJtYXhXaWR0aCIsIm1hcmdpbiIsImVsZXZhdGlvbiIsInAiLCJtYiIsImJvcmRlclJhZGl1cyIsInZhcmlhbnQiLCJndXR0ZXJCb3R0b20iLCJjb2xvciIsImluIiwic2V2ZXJpdHkiLCJhY3Rpb24iLCJhcmlhLWxhYmVsIiwib25DbGljayIsImZvbnRTaXplIiwiYm9yZGVyIiwidGV4dEFsaWduIiwiYmFja2dyb3VuZENvbG9yIiwiY3Vyc29yIiwidHJhbnNpdGlvbiIsImJvcmRlckNvbG9yIiwiZ2V0RWxlbWVudEJ5SWQiLCJjbGljayIsImlucHV0IiwiaWQiLCJhY2NlcHQiLCJvbkNoYW5nZSIsInN0eWxlIiwidG9GaXhlZCIsImZ1bGxXaWR0aCIsImRpc2FibGVkIiwic3RhcnRJY29uIiwicHkiLCJsZW5ndGgiLCJtYXAiLCJkb2MiLCJpbmRleCIsImNvbXBvbmVudCIsIm1yIiwicHJpbWFyeSIsInNlY29uZGFyeSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(pages-dir-node)/./components/document/DocumentUploader.js\n");

/***/ }),

/***/ "(pages-dir-node)/./components/layout/Header.js":
/*!*************************************!*\
  !*** ./components/layout/Header.js ***!
  \*************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Header)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _barrel_optimize_names_AppBar_Box_Button_IconButton_Menu_MenuItem_Toolbar_Typography_useMediaQuery_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! __barrel_optimize__?names=AppBar,Box,Button,IconButton,Menu,MenuItem,Toolbar,Typography,useMediaQuery,useTheme!=!@mui/material */ \"(pages-dir-node)/__barrel_optimize__?names=AppBar,Box,Button,IconButton,Menu,MenuItem,Toolbar,Typography,useMediaQuery,useTheme!=!./node_modules/@mui/material/esm/index.js\");\n/* harmony import */ var _mui_icons_material_Menu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/icons-material/Menu */ \"(pages-dir-node)/./node_modules/@mui/icons-material/esm/Menu.js\");\n/* harmony import */ var _mui_icons_material_Translate__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/icons-material/Translate */ \"(pages-dir-node)/./node_modules/@mui/icons-material/esm/Translate.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/link */ \"(pages-dir-node)/./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_barrel_optimize_names_AppBar_Box_Button_IconButton_Menu_MenuItem_Toolbar_Typography_useMediaQuery_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_3__, _mui_icons_material_Translate__WEBPACK_IMPORTED_MODULE_4__, _mui_icons_material_Menu__WEBPACK_IMPORTED_MODULE_5__]);\n([_barrel_optimize_names_AppBar_Box_Button_IconButton_Menu_MenuItem_Toolbar_Typography_useMediaQuery_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_3__, _mui_icons_material_Translate__WEBPACK_IMPORTED_MODULE_4__, _mui_icons_material_Menu__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\n\n\nconst languages = [\n    {\n        name: 'English',\n        code: 'en'\n    },\n    {\n        name: 'हिंदी',\n        code: 'hi'\n    },\n    {\n        name: 'বাংলা',\n        code: 'bn'\n    },\n    {\n        name: 'తెలుగు',\n        code: 'te'\n    },\n    {\n        name: 'தமிழ்',\n        code: 'ta'\n    },\n    {\n        name: 'ಕನ್ನಡ',\n        code: 'kn'\n    },\n    {\n        name: 'मराठी',\n        code: 'mr'\n    },\n    {\n        name: 'ગુજરાતી',\n        code: 'gu'\n    }\n];\nfunction Header({ currentLanguage, setLanguage }) {\n    const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [languageMenuAnchorEl, setLanguageMenuAnchorEl] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const theme = (0,_barrel_optimize_names_AppBar_Box_Button_IconButton_Menu_MenuItem_Toolbar_Typography_useMediaQuery_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_3__.useTheme)();\n    const isMobile = (0,_barrel_optimize_names_AppBar_Box_Button_IconButton_Menu_MenuItem_Toolbar_Typography_useMediaQuery_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_3__.useMediaQuery)(theme.breakpoints.down('md'));\n    const handleMobileMenuOpen = (event)=>{\n        setMobileMenuAnchorEl(event.currentTarget);\n    };\n    const handleMobileMenuClose = ()=>{\n        setMobileMenuAnchorEl(null);\n    };\n    const handleLanguageMenuOpen = (event)=>{\n        setLanguageMenuAnchorEl(event.currentTarget);\n    };\n    const handleLanguageMenuClose = ()=>{\n        setLanguageMenuAnchorEl(null);\n    };\n    const handleLanguageSelect = (code)=>{\n        setLanguage(code);\n        handleLanguageMenuClose();\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_IconButton_Menu_MenuItem_Toolbar_Typography_useMediaQuery_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_3__.AppBar, {\n        position: \"static\",\n        color: \"transparent\",\n        elevation: 1,\n        sx: {\n            backgroundColor: 'white'\n        },\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_IconButton_Menu_MenuItem_Toolbar_Typography_useMediaQuery_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_3__.Toolbar, {\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {\n                    href: \"/\",\n                    passHref: true,\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_IconButton_Menu_MenuItem_Toolbar_Typography_useMediaQuery_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_3__.Box, {\n                        sx: {\n                            display: 'flex',\n                            alignItems: 'center',\n                            cursor: 'pointer'\n                        },\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_IconButton_Menu_MenuItem_Toolbar_Typography_useMediaQuery_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_3__.Typography, {\n                            variant: \"h6\",\n                            component: \"div\",\n                            sx: {\n                                flexGrow: 1,\n                                color: theme.palette.primary.main,\n                                fontWeight: 'bold',\n                                fontFamily: 'Poppins'\n                            },\n                            children: \"NyayaBot\"\n                        }, void 0, false, {\n                            fileName: \"/home/runner/workspace/components/layout/Header.js\",\n                            lineNumber: 61,\n                            columnNumber: 13\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"/home/runner/workspace/components/layout/Header.js\",\n                        lineNumber: 60,\n                        columnNumber: 11\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"/home/runner/workspace/components/layout/Header.js\",\n                    lineNumber: 59,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_IconButton_Menu_MenuItem_Toolbar_Typography_useMediaQuery_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_3__.Box, {\n                    sx: {\n                        flexGrow: 1\n                    }\n                }, void 0, false, {\n                    fileName: \"/home/runner/workspace/components/layout/Header.js\",\n                    lineNumber: 67,\n                    columnNumber: 9\n                }, this),\n                isMobile ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_IconButton_Menu_MenuItem_Toolbar_Typography_useMediaQuery_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_3__.IconButton, {\n                            edge: \"end\",\n                            color: \"inherit\",\n                            \"aria-label\": \"language\",\n                            onClick: handleLanguageMenuOpen,\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_icons_material_Translate__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {}, void 0, false, {\n                                fileName: \"/home/runner/workspace/components/layout/Header.js\",\n                                lineNumber: 77,\n                                columnNumber: 15\n                            }, this)\n                        }, void 0, false, {\n                            fileName: \"/home/runner/workspace/components/layout/Header.js\",\n                            lineNumber: 71,\n                            columnNumber: 13\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_IconButton_Menu_MenuItem_Toolbar_Typography_useMediaQuery_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_3__.IconButton, {\n                            edge: \"end\",\n                            color: \"inherit\",\n                            \"aria-label\": \"menu\",\n                            onClick: handleMobileMenuOpen,\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_icons_material_Menu__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {}, void 0, false, {\n                                fileName: \"/home/runner/workspace/components/layout/Header.js\",\n                                lineNumber: 85,\n                                columnNumber: 15\n                            }, this)\n                        }, void 0, false, {\n                            fileName: \"/home/runner/workspace/components/layout/Header.js\",\n                            lineNumber: 79,\n                            columnNumber: 13\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_IconButton_Menu_MenuItem_Toolbar_Typography_useMediaQuery_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_3__.Menu, {\n                            anchorEl: mobileMenuAnchorEl,\n                            open: Boolean(mobileMenuAnchorEl),\n                            onClose: handleMobileMenuClose,\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_IconButton_Menu_MenuItem_Toolbar_Typography_useMediaQuery_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_3__.MenuItem, {\n                                    onClick: handleMobileMenuClose,\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {\n                                        href: \"/\",\n                                        passHref: true,\n                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_IconButton_Menu_MenuItem_Toolbar_Typography_useMediaQuery_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_3__.Typography, {\n                                            children: \"Home\"\n                                        }, void 0, false, {\n                                            fileName: \"/home/runner/workspace/components/layout/Header.js\",\n                                            lineNumber: 94,\n                                            columnNumber: 19\n                                        }, this)\n                                    }, void 0, false, {\n                                        fileName: \"/home/runner/workspace/components/layout/Header.js\",\n                                        lineNumber: 93,\n                                        columnNumber: 17\n                                    }, this)\n                                }, void 0, false, {\n                                    fileName: \"/home/runner/workspace/components/layout/Header.js\",\n                                    lineNumber: 92,\n                                    columnNumber: 15\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_IconButton_Menu_MenuItem_Toolbar_Typography_useMediaQuery_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_3__.MenuItem, {\n                                    onClick: handleMobileMenuClose,\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {\n                                        href: \"/upload\",\n                                        passHref: true,\n                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_IconButton_Menu_MenuItem_Toolbar_Typography_useMediaQuery_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_3__.Typography, {\n                                            children: \"Upload Documents\"\n                                        }, void 0, false, {\n                                            fileName: \"/home/runner/workspace/components/layout/Header.js\",\n                                            lineNumber: 99,\n                                            columnNumber: 19\n                                        }, this)\n                                    }, void 0, false, {\n                                        fileName: \"/home/runner/workspace/components/layout/Header.js\",\n                                        lineNumber: 98,\n                                        columnNumber: 17\n                                    }, this)\n                                }, void 0, false, {\n                                    fileName: \"/home/runner/workspace/components/layout/Header.js\",\n                                    lineNumber: 97,\n                                    columnNumber: 15\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_IconButton_Menu_MenuItem_Toolbar_Typography_useMediaQuery_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_3__.MenuItem, {\n                                    onClick: handleMobileMenuClose,\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {\n                                        href: \"/about\",\n                                        passHref: true,\n                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_IconButton_Menu_MenuItem_Toolbar_Typography_useMediaQuery_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_3__.Typography, {\n                                            children: \"About\"\n                                        }, void 0, false, {\n                                            fileName: \"/home/runner/workspace/components/layout/Header.js\",\n                                            lineNumber: 104,\n                                            columnNumber: 19\n                                        }, this)\n                                    }, void 0, false, {\n                                        fileName: \"/home/runner/workspace/components/layout/Header.js\",\n                                        lineNumber: 103,\n                                        columnNumber: 17\n                                    }, this)\n                                }, void 0, false, {\n                                    fileName: \"/home/runner/workspace/components/layout/Header.js\",\n                                    lineNumber: 102,\n                                    columnNumber: 15\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_IconButton_Menu_MenuItem_Toolbar_Typography_useMediaQuery_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_3__.MenuItem, {\n                                    onClick: handleMobileMenuClose,\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {\n                                        href: \"/contact\",\n                                        passHref: true,\n                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_IconButton_Menu_MenuItem_Toolbar_Typography_useMediaQuery_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_3__.Typography, {\n                                            children: \"Contact\"\n                                        }, void 0, false, {\n                                            fileName: \"/home/runner/workspace/components/layout/Header.js\",\n                                            lineNumber: 109,\n                                            columnNumber: 19\n                                        }, this)\n                                    }, void 0, false, {\n                                        fileName: \"/home/runner/workspace/components/layout/Header.js\",\n                                        lineNumber: 108,\n                                        columnNumber: 17\n                                    }, this)\n                                }, void 0, false, {\n                                    fileName: \"/home/runner/workspace/components/layout/Header.js\",\n                                    lineNumber: 107,\n                                    columnNumber: 15\n                                }, this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/home/runner/workspace/components/layout/Header.js\",\n                            lineNumber: 87,\n                            columnNumber: 13\n                        }, this)\n                    ]\n                }, void 0, true) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_IconButton_Menu_MenuItem_Toolbar_Typography_useMediaQuery_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_3__.Box, {\n                        sx: {\n                            display: 'flex',\n                            gap: 2\n                        },\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_IconButton_Menu_MenuItem_Toolbar_Typography_useMediaQuery_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_3__.Button, {\n                                color: \"inherit\",\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {\n                                    href: \"/upload\",\n                                    passHref: true,\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_IconButton_Menu_MenuItem_Toolbar_Typography_useMediaQuery_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_3__.Typography, {\n                                        sx: {\n                                            color: theme.palette.text.secondary\n                                        },\n                                        children: \"Upload Documents\"\n                                    }, void 0, false, {\n                                        fileName: \"/home/runner/workspace/components/layout/Header.js\",\n                                        lineNumber: 119,\n                                        columnNumber: 19\n                                    }, this)\n                                }, void 0, false, {\n                                    fileName: \"/home/runner/workspace/components/layout/Header.js\",\n                                    lineNumber: 118,\n                                    columnNumber: 17\n                                }, this)\n                            }, void 0, false, {\n                                fileName: \"/home/runner/workspace/components/layout/Header.js\",\n                                lineNumber: 117,\n                                columnNumber: 15\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_IconButton_Menu_MenuItem_Toolbar_Typography_useMediaQuery_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_3__.Button, {\n                                color: \"inherit\",\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {\n                                    href: \"/about\",\n                                    passHref: true,\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_IconButton_Menu_MenuItem_Toolbar_Typography_useMediaQuery_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_3__.Typography, {\n                                        sx: {\n                                            color: theme.palette.text.secondary\n                                        },\n                                        children: \"About\"\n                                    }, void 0, false, {\n                                        fileName: \"/home/runner/workspace/components/layout/Header.js\",\n                                        lineNumber: 124,\n                                        columnNumber: 19\n                                    }, this)\n                                }, void 0, false, {\n                                    fileName: \"/home/runner/workspace/components/layout/Header.js\",\n                                    lineNumber: 123,\n                                    columnNumber: 17\n                                }, this)\n                            }, void 0, false, {\n                                fileName: \"/home/runner/workspace/components/layout/Header.js\",\n                                lineNumber: 122,\n                                columnNumber: 15\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_IconButton_Menu_MenuItem_Toolbar_Typography_useMediaQuery_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_3__.Button, {\n                                color: \"inherit\",\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {\n                                    href: \"/contact\",\n                                    passHref: true,\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_IconButton_Menu_MenuItem_Toolbar_Typography_useMediaQuery_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_3__.Typography, {\n                                        sx: {\n                                            color: theme.palette.text.secondary\n                                        },\n                                        children: \"Contact\"\n                                    }, void 0, false, {\n                                        fileName: \"/home/runner/workspace/components/layout/Header.js\",\n                                        lineNumber: 129,\n                                        columnNumber: 19\n                                    }, this)\n                                }, void 0, false, {\n                                    fileName: \"/home/runner/workspace/components/layout/Header.js\",\n                                    lineNumber: 128,\n                                    columnNumber: 17\n                                }, this)\n                            }, void 0, false, {\n                                fileName: \"/home/runner/workspace/components/layout/Header.js\",\n                                lineNumber: 127,\n                                columnNumber: 15\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_IconButton_Menu_MenuItem_Toolbar_Typography_useMediaQuery_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_3__.Button, {\n                                color: \"inherit\",\n                                onClick: handleLanguageMenuOpen,\n                                startIcon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_icons_material_Translate__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {}, void 0, false, {\n                                    fileName: \"/home/runner/workspace/components/layout/Header.js\",\n                                    lineNumber: 135,\n                                    columnNumber: 28\n                                }, void 0),\n                                children: languages.find((lang)=>lang.code === currentLanguage)?.name || 'English'\n                            }, void 0, false, {\n                                fileName: \"/home/runner/workspace/components/layout/Header.js\",\n                                lineNumber: 132,\n                                columnNumber: 15\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/home/runner/workspace/components/layout/Header.js\",\n                        lineNumber: 116,\n                        columnNumber: 13\n                    }, this)\n                }, void 0, false),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_IconButton_Menu_MenuItem_Toolbar_Typography_useMediaQuery_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_3__.Menu, {\n                    anchorEl: languageMenuAnchorEl,\n                    open: Boolean(languageMenuAnchorEl),\n                    onClose: handleLanguageMenuClose,\n                    children: languages.map((language)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_IconButton_Menu_MenuItem_Toolbar_Typography_useMediaQuery_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_3__.MenuItem, {\n                            onClick: ()=>handleLanguageSelect(language.code),\n                            selected: currentLanguage === language.code,\n                            children: language.name\n                        }, language.code, false, {\n                            fileName: \"/home/runner/workspace/components/layout/Header.js\",\n                            lineNumber: 149,\n                            columnNumber: 13\n                        }, this))\n                }, void 0, false, {\n                    fileName: \"/home/runner/workspace/components/layout/Header.js\",\n                    lineNumber: 143,\n                    columnNumber: 9\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"/home/runner/workspace/components/layout/Header.js\",\n            lineNumber: 58,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/home/runner/workspace/components/layout/Header.js\",\n        lineNumber: 57,\n        columnNumber: 5\n    }, this);\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL2NvbXBvbmVudHMvbGF5b3V0L0hlYWRlci5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFpQztBQVlWO0FBQ3lCO0FBQ1U7QUFDN0I7QUFFN0IsTUFBTWMsWUFBWTtJQUNoQjtRQUFFQyxNQUFNO1FBQVdDLE1BQU07SUFBSztJQUM5QjtRQUFFRCxNQUFNO1FBQVNDLE1BQU07SUFBSztJQUM1QjtRQUFFRCxNQUFNO1FBQVNDLE1BQU07SUFBSztJQUM1QjtRQUFFRCxNQUFNO1FBQVVDLE1BQU07SUFBSztJQUM3QjtRQUFFRCxNQUFNO1FBQVNDLE1BQU07SUFBSztJQUM1QjtRQUFFRCxNQUFNO1FBQVNDLE1BQU07SUFBSztJQUM1QjtRQUFFRCxNQUFNO1FBQVNDLE1BQU07SUFBSztJQUM1QjtRQUFFRCxNQUFNO1FBQVdDLE1BQU07SUFBSztDQUMvQjtBQUVjLFNBQVNDLE9BQU8sRUFBRUMsZUFBZSxFQUFFQyxXQUFXLEVBQUU7SUFDN0QsTUFBTSxDQUFDQyxvQkFBb0JDLHNCQUFzQixHQUFHckIsK0NBQVFBLENBQUM7SUFDN0QsTUFBTSxDQUFDc0Isc0JBQXNCQyx3QkFBd0IsR0FBR3ZCLCtDQUFRQSxDQUFDO0lBQ2pFLE1BQU13QixRQUFRZCxrS0FBUUE7SUFDdEIsTUFBTWUsV0FBV2hCLHVLQUFhQSxDQUFDZSxNQUFNRSxXQUFXLENBQUNDLElBQUksQ0FBQztJQUV0RCxNQUFNQyx1QkFBdUIsQ0FBQ0M7UUFDNUJSLHNCQUFzQlEsTUFBTUMsYUFBYTtJQUMzQztJQUVBLE1BQU1DLHdCQUF3QjtRQUM1QlYsc0JBQXNCO0lBQ3hCO0lBRUEsTUFBTVcseUJBQXlCLENBQUNIO1FBQzlCTix3QkFBd0JNLE1BQU1DLGFBQWE7SUFDN0M7SUFFQSxNQUFNRywwQkFBMEI7UUFDOUJWLHdCQUF3QjtJQUMxQjtJQUVBLE1BQU1XLHVCQUF1QixDQUFDbEI7UUFDNUJHLFlBQVlIO1FBQ1ppQjtJQUNGO0lBRUEscUJBQ0UsOERBQUNoQyw0SkFBTUE7UUFBQ2tDLFVBQVM7UUFBU0MsT0FBTTtRQUFjQyxXQUFXO1FBQUdDLElBQUk7WUFBRUMsaUJBQWlCO1FBQVE7a0JBQ3pGLDRFQUFDckMsNkpBQU9BOzs4QkFDTiw4REFBQ1csa0RBQUlBO29CQUFDMkIsTUFBSztvQkFBSUMsUUFBUTs4QkFDckIsNEVBQUNqQyx5SkFBR0E7d0JBQUM4QixJQUFJOzRCQUFFSSxTQUFTOzRCQUFRQyxZQUFZOzRCQUFVQyxRQUFRO3dCQUFVO2tDQUNsRSw0RUFBQ3pDLGdLQUFVQTs0QkFBQzBDLFNBQVE7NEJBQUtDLFdBQVU7NEJBQU1SLElBQUk7Z0NBQUVTLFVBQVU7Z0NBQUdYLE9BQU9aLE1BQU13QixPQUFPLENBQUNDLE9BQU8sQ0FBQ0MsSUFBSTtnQ0FBRUMsWUFBWTtnQ0FBUUMsWUFBWTs0QkFBVTtzQ0FBRzs7Ozs7Ozs7Ozs7Ozs7Ozs4QkFNaEosOERBQUM1Qyx5SkFBR0E7b0JBQUM4QixJQUFJO3dCQUFFUyxVQUFVO29CQUFFOzs7Ozs7Z0JBRXRCdEIseUJBQ0M7O3NDQUNFLDhEQUFDcEIsZ0tBQVVBOzRCQUNUZ0QsTUFBSzs0QkFDTGpCLE9BQU07NEJBQ05rQixjQUFXOzRCQUNYQyxTQUFTdkI7c0NBRVQsNEVBQUNwQixxRUFBYUE7Ozs7Ozs7Ozs7c0NBRWhCLDhEQUFDUCxnS0FBVUE7NEJBQ1RnRCxNQUFLOzRCQUNMakIsT0FBTTs0QkFDTmtCLGNBQVc7NEJBQ1hDLFNBQVMzQjtzQ0FFVCw0RUFBQ2pCLGdFQUFRQTs7Ozs7Ozs7OztzQ0FFWCw4REFBQ0wsMEpBQUlBOzRCQUNIa0QsVUFBVXBDOzRCQUNWcUMsTUFBTUMsUUFBUXRDOzRCQUNkdUMsU0FBUzVCOzs4Q0FFVCw4REFBQ3hCLDhKQUFRQTtvQ0FBQ2dELFNBQVN4Qjs4Q0FDakIsNEVBQUNsQixrREFBSUE7d0NBQUMyQixNQUFLO3dDQUFJQyxRQUFRO2tEQUNyQiw0RUFBQ3RDLGdLQUFVQTtzREFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs4Q0FHaEIsOERBQUNJLDhKQUFRQTtvQ0FBQ2dELFNBQVN4Qjs4Q0FDakIsNEVBQUNsQixrREFBSUE7d0NBQUMyQixNQUFLO3dDQUFVQyxRQUFRO2tEQUMzQiw0RUFBQ3RDLGdLQUFVQTtzREFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs4Q0FHaEIsOERBQUNJLDhKQUFRQTtvQ0FBQ2dELFNBQVN4Qjs4Q0FDakIsNEVBQUNsQixrREFBSUE7d0NBQUMyQixNQUFLO3dDQUFTQyxRQUFRO2tEQUMxQiw0RUFBQ3RDLGdLQUFVQTtzREFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs4Q0FHaEIsOERBQUNJLDhKQUFRQTtvQ0FBQ2dELFNBQVN4Qjs4Q0FDakIsNEVBQUNsQixrREFBSUE7d0NBQUMyQixNQUFLO3dDQUFXQyxRQUFRO2tEQUM1Qiw0RUFBQ3RDLGdLQUFVQTtzREFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7aURBTXBCOzhCQUNFLDRFQUFDSyx5SkFBR0E7d0JBQUM4QixJQUFJOzRCQUFFSSxTQUFTOzRCQUFRa0IsS0FBSzt3QkFBRTs7MENBQ2pDLDhEQUFDeEQsNEpBQU1BO2dDQUFDZ0MsT0FBTTswQ0FDWiw0RUFBQ3ZCLGtEQUFJQTtvQ0FBQzJCLE1BQUs7b0NBQVVDLFFBQVE7OENBQzNCLDRFQUFDdEMsZ0tBQVVBO3dDQUFDbUMsSUFBSTs0Q0FBRUYsT0FBT1osTUFBTXdCLE9BQU8sQ0FBQ2EsSUFBSSxDQUFDQyxTQUFTO3dDQUFDO2tEQUFHOzs7Ozs7Ozs7Ozs7Ozs7OzBDQUc3RCw4REFBQzFELDRKQUFNQTtnQ0FBQ2dDLE9BQU07MENBQ1osNEVBQUN2QixrREFBSUE7b0NBQUMyQixNQUFLO29DQUFTQyxRQUFROzhDQUMxQiw0RUFBQ3RDLGdLQUFVQTt3Q0FBQ21DLElBQUk7NENBQUVGLE9BQU9aLE1BQU13QixPQUFPLENBQUNhLElBQUksQ0FBQ0MsU0FBUzt3Q0FBQztrREFBRzs7Ozs7Ozs7Ozs7Ozs7OzswQ0FHN0QsOERBQUMxRCw0SkFBTUE7Z0NBQUNnQyxPQUFNOzBDQUNaLDRFQUFDdkIsa0RBQUlBO29DQUFDMkIsTUFBSztvQ0FBV0MsUUFBUTs4Q0FDNUIsNEVBQUN0QyxnS0FBVUE7d0NBQUNtQyxJQUFJOzRDQUFFRixPQUFPWixNQUFNd0IsT0FBTyxDQUFDYSxJQUFJLENBQUNDLFNBQVM7d0NBQUM7a0RBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7MENBRzdELDhEQUFDMUQsNEpBQU1BO2dDQUNMZ0MsT0FBTTtnQ0FDTm1CLFNBQVN2QjtnQ0FDVCtCLHlCQUFXLDhEQUFDbkQscUVBQWFBOzs7OzswQ0FFeEJFLFVBQVVrRCxJQUFJLENBQUNDLENBQUFBLE9BQVFBLEtBQUtqRCxJQUFJLEtBQUtFLGtCQUFrQkgsUUFBUTs7Ozs7Ozs7Ozs7Ozs4QkFNeEUsOERBQUNULDBKQUFJQTtvQkFDSGtELFVBQVVsQztvQkFDVm1DLE1BQU1DLFFBQVFwQztvQkFDZHFDLFNBQVMxQjs4QkFFUm5CLFVBQVVvRCxHQUFHLENBQUMsQ0FBQ0MseUJBQ2QsOERBQUM1RCw4SkFBUUE7NEJBRVBnRCxTQUFTLElBQU1yQixxQkFBcUJpQyxTQUFTbkQsSUFBSTs0QkFDakRvRCxVQUFVbEQsb0JBQW9CaUQsU0FBU25ELElBQUk7c0NBRTFDbUQsU0FBU3BELElBQUk7MkJBSlRvRCxTQUFTbkQsSUFBSTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBV2hDIiwic291cmNlcyI6WyIvaG9tZS9ydW5uZXIvd29ya3NwYWNlL2NvbXBvbmVudHMvbGF5b3V0L0hlYWRlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFxuICBBcHBCYXIsIFxuICBUb29sYmFyLCBcbiAgVHlwb2dyYXBoeSwgXG4gIEJ1dHRvbiwgXG4gIEljb25CdXR0b24sIFxuICBNZW51LCBcbiAgTWVudUl0ZW0sIFxuICBCb3gsXG4gIHVzZU1lZGlhUXVlcnksXG4gIHVzZVRoZW1lLFxufSBmcm9tICdAbXVpL21hdGVyaWFsJztcbmltcG9ydCBNZW51SWNvbiBmcm9tICdAbXVpL2ljb25zLW1hdGVyaWFsL01lbnUnO1xuaW1wb3J0IFRyYW5zbGF0ZUljb24gZnJvbSAnQG11aS9pY29ucy1tYXRlcmlhbC9UcmFuc2xhdGUnO1xuaW1wb3J0IExpbmsgZnJvbSAnbmV4dC9saW5rJztcblxuY29uc3QgbGFuZ3VhZ2VzID0gW1xuICB7IG5hbWU6ICdFbmdsaXNoJywgY29kZTogJ2VuJyB9LFxuICB7IG5hbWU6ICfgpLngpL/gpILgpKbgpYAnLCBjb2RlOiAnaGknIH0sXG4gIHsgbmFtZTogJ+CmrOCmvuCmguCmsuCmvicsIGNvZGU6ICdibicgfSxcbiAgeyBuYW1lOiAn4LCk4LGG4LCy4LGB4LCX4LGBJywgY29kZTogJ3RlJyB9LFxuICB7IG5hbWU6ICfgrqTgrq7grr/grrTgr40nLCBjb2RlOiAndGEnIH0sXG4gIHsgbmFtZTogJ+CyleCyqOCzjeCyqOCyoScsIGNvZGU6ICdrbicgfSxcbiAgeyBuYW1lOiAn4KSu4KSw4KS+4KSg4KWAJywgY29kZTogJ21yJyB9LFxuICB7IG5hbWU6ICfgqpfgq4HgqpzgqrDgqr7gqqTgq4AnLCBjb2RlOiAnZ3UnIH0sXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBIZWFkZXIoeyBjdXJyZW50TGFuZ3VhZ2UsIHNldExhbmd1YWdlIH0pIHtcbiAgY29uc3QgW21vYmlsZU1lbnVBbmNob3JFbCwgc2V0TW9iaWxlTWVudUFuY2hvckVsXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbbGFuZ3VhZ2VNZW51QW5jaG9yRWwsIHNldExhbmd1YWdlTWVudUFuY2hvckVsXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCB0aGVtZSA9IHVzZVRoZW1lKCk7XG4gIGNvbnN0IGlzTW9iaWxlID0gdXNlTWVkaWFRdWVyeSh0aGVtZS5icmVha3BvaW50cy5kb3duKCdtZCcpKTtcblxuICBjb25zdCBoYW5kbGVNb2JpbGVNZW51T3BlbiA9IChldmVudCkgPT4ge1xuICAgIHNldE1vYmlsZU1lbnVBbmNob3JFbChldmVudC5jdXJyZW50VGFyZ2V0KTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVNb2JpbGVNZW51Q2xvc2UgPSAoKSA9PiB7XG4gICAgc2V0TW9iaWxlTWVudUFuY2hvckVsKG51bGwpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUxhbmd1YWdlTWVudU9wZW4gPSAoZXZlbnQpID0+IHtcbiAgICBzZXRMYW5ndWFnZU1lbnVBbmNob3JFbChldmVudC5jdXJyZW50VGFyZ2V0KTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVMYW5ndWFnZU1lbnVDbG9zZSA9ICgpID0+IHtcbiAgICBzZXRMYW5ndWFnZU1lbnVBbmNob3JFbChudWxsKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVMYW5ndWFnZVNlbGVjdCA9IChjb2RlKSA9PiB7XG4gICAgc2V0TGFuZ3VhZ2UoY29kZSk7XG4gICAgaGFuZGxlTGFuZ3VhZ2VNZW51Q2xvc2UoKTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxBcHBCYXIgcG9zaXRpb249XCJzdGF0aWNcIiBjb2xvcj1cInRyYW5zcGFyZW50XCIgZWxldmF0aW9uPXsxfSBzeD17eyBiYWNrZ3JvdW5kQ29sb3I6ICd3aGl0ZScgfX0+XG4gICAgICA8VG9vbGJhcj5cbiAgICAgICAgPExpbmsgaHJlZj1cIi9cIiBwYXNzSHJlZj5cbiAgICAgICAgICA8Qm94IHN4PXt7IGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGN1cnNvcjogJ3BvaW50ZXInIH19PlxuICAgICAgICAgICAgPFR5cG9ncmFwaHkgdmFyaWFudD1cImg2XCIgY29tcG9uZW50PVwiZGl2XCIgc3g9e3sgZmxleEdyb3c6IDEsIGNvbG9yOiB0aGVtZS5wYWxldHRlLnByaW1hcnkubWFpbiwgZm9udFdlaWdodDogJ2JvbGQnLCBmb250RmFtaWx5OiAnUG9wcGlucycgfX0+XG4gICAgICAgICAgICAgIE55YXlhQm90XG4gICAgICAgICAgICA8L1R5cG9ncmFwaHk+XG4gICAgICAgICAgPC9Cb3g+XG4gICAgICAgIDwvTGluaz5cbiAgICAgICAgXG4gICAgICAgIDxCb3ggc3g9e3sgZmxleEdyb3c6IDEgfX0gLz5cbiAgICAgICAgXG4gICAgICAgIHtpc01vYmlsZSA/IChcbiAgICAgICAgICA8PlxuICAgICAgICAgICAgPEljb25CdXR0b25cbiAgICAgICAgICAgICAgZWRnZT1cImVuZFwiXG4gICAgICAgICAgICAgIGNvbG9yPVwiaW5oZXJpdFwiXG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJsYW5ndWFnZVwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZUxhbmd1YWdlTWVudU9wZW59XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxUcmFuc2xhdGVJY29uIC8+XG4gICAgICAgICAgICA8L0ljb25CdXR0b24+XG4gICAgICAgICAgICA8SWNvbkJ1dHRvblxuICAgICAgICAgICAgICBlZGdlPVwiZW5kXCJcbiAgICAgICAgICAgICAgY29sb3I9XCJpbmhlcml0XCJcbiAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cIm1lbnVcIlxuICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVNb2JpbGVNZW51T3Blbn1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPE1lbnVJY29uIC8+XG4gICAgICAgICAgICA8L0ljb25CdXR0b24+XG4gICAgICAgICAgICA8TWVudVxuICAgICAgICAgICAgICBhbmNob3JFbD17bW9iaWxlTWVudUFuY2hvckVsfVxuICAgICAgICAgICAgICBvcGVuPXtCb29sZWFuKG1vYmlsZU1lbnVBbmNob3JFbCl9XG4gICAgICAgICAgICAgIG9uQ2xvc2U9e2hhbmRsZU1vYmlsZU1lbnVDbG9zZX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPE1lbnVJdGVtIG9uQ2xpY2s9e2hhbmRsZU1vYmlsZU1lbnVDbG9zZX0+XG4gICAgICAgICAgICAgICAgPExpbmsgaHJlZj1cIi9cIiBwYXNzSHJlZj5cbiAgICAgICAgICAgICAgICAgIDxUeXBvZ3JhcGh5PkhvbWU8L1R5cG9ncmFwaHk+XG4gICAgICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICAgICA8L01lbnVJdGVtPlxuICAgICAgICAgICAgICA8TWVudUl0ZW0gb25DbGljaz17aGFuZGxlTW9iaWxlTWVudUNsb3NlfT5cbiAgICAgICAgICAgICAgICA8TGluayBocmVmPVwiL3VwbG9hZFwiIHBhc3NIcmVmPlxuICAgICAgICAgICAgICAgICAgPFR5cG9ncmFwaHk+VXBsb2FkIERvY3VtZW50czwvVHlwb2dyYXBoeT5cbiAgICAgICAgICAgICAgICA8L0xpbms+XG4gICAgICAgICAgICAgIDwvTWVudUl0ZW0+XG4gICAgICAgICAgICAgIDxNZW51SXRlbSBvbkNsaWNrPXtoYW5kbGVNb2JpbGVNZW51Q2xvc2V9PlxuICAgICAgICAgICAgICAgIDxMaW5rIGhyZWY9XCIvYWJvdXRcIiBwYXNzSHJlZj5cbiAgICAgICAgICAgICAgICAgIDxUeXBvZ3JhcGh5PkFib3V0PC9UeXBvZ3JhcGh5PlxuICAgICAgICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICAgICAgPC9NZW51SXRlbT5cbiAgICAgICAgICAgICAgPE1lbnVJdGVtIG9uQ2xpY2s9e2hhbmRsZU1vYmlsZU1lbnVDbG9zZX0+XG4gICAgICAgICAgICAgICAgPExpbmsgaHJlZj1cIi9jb250YWN0XCIgcGFzc0hyZWY+XG4gICAgICAgICAgICAgICAgICA8VHlwb2dyYXBoeT5Db250YWN0PC9UeXBvZ3JhcGh5PlxuICAgICAgICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICAgICAgPC9NZW51SXRlbT5cbiAgICAgICAgICAgIDwvTWVudT5cbiAgICAgICAgICA8Lz5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8PlxuICAgICAgICAgICAgPEJveCBzeD17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogMiB9fT5cbiAgICAgICAgICAgICAgPEJ1dHRvbiBjb2xvcj1cImluaGVyaXRcIj5cbiAgICAgICAgICAgICAgICA8TGluayBocmVmPVwiL3VwbG9hZFwiIHBhc3NIcmVmPlxuICAgICAgICAgICAgICAgICAgPFR5cG9ncmFwaHkgc3g9e3sgY29sb3I6IHRoZW1lLnBhbGV0dGUudGV4dC5zZWNvbmRhcnkgfX0+VXBsb2FkIERvY3VtZW50czwvVHlwb2dyYXBoeT5cbiAgICAgICAgICAgICAgICA8L0xpbms+XG4gICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICA8QnV0dG9uIGNvbG9yPVwiaW5oZXJpdFwiPlxuICAgICAgICAgICAgICAgIDxMaW5rIGhyZWY9XCIvYWJvdXRcIiBwYXNzSHJlZj5cbiAgICAgICAgICAgICAgICAgIDxUeXBvZ3JhcGh5IHN4PXt7IGNvbG9yOiB0aGVtZS5wYWxldHRlLnRleHQuc2Vjb25kYXJ5IH19PkFib3V0PC9UeXBvZ3JhcGh5PlxuICAgICAgICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgIDxCdXR0b24gY29sb3I9XCJpbmhlcml0XCI+XG4gICAgICAgICAgICAgICAgPExpbmsgaHJlZj1cIi9jb250YWN0XCIgcGFzc0hyZWY+XG4gICAgICAgICAgICAgICAgICA8VHlwb2dyYXBoeSBzeD17eyBjb2xvcjogdGhlbWUucGFsZXR0ZS50ZXh0LnNlY29uZGFyeSB9fT5Db250YWN0PC9UeXBvZ3JhcGh5PlxuICAgICAgICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgIDxCdXR0b24gXG4gICAgICAgICAgICAgICAgY29sb3I9XCJpbmhlcml0XCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVMYW5ndWFnZU1lbnVPcGVufVxuICAgICAgICAgICAgICAgIHN0YXJ0SWNvbj17PFRyYW5zbGF0ZUljb24gLz59XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7bGFuZ3VhZ2VzLmZpbmQobGFuZyA9PiBsYW5nLmNvZGUgPT09IGN1cnJlbnRMYW5ndWFnZSk/Lm5hbWUgfHwgJ0VuZ2xpc2gnfVxuICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgIDwvPlxuICAgICAgICApfVxuICAgICAgICBcbiAgICAgICAgPE1lbnVcbiAgICAgICAgICBhbmNob3JFbD17bGFuZ3VhZ2VNZW51QW5jaG9yRWx9XG4gICAgICAgICAgb3Blbj17Qm9vbGVhbihsYW5ndWFnZU1lbnVBbmNob3JFbCl9XG4gICAgICAgICAgb25DbG9zZT17aGFuZGxlTGFuZ3VhZ2VNZW51Q2xvc2V9XG4gICAgICAgID5cbiAgICAgICAgICB7bGFuZ3VhZ2VzLm1hcCgobGFuZ3VhZ2UpID0+IChcbiAgICAgICAgICAgIDxNZW51SXRlbSBcbiAgICAgICAgICAgICAga2V5PXtsYW5ndWFnZS5jb2RlfSBcbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlTGFuZ3VhZ2VTZWxlY3QobGFuZ3VhZ2UuY29kZSl9XG4gICAgICAgICAgICAgIHNlbGVjdGVkPXtjdXJyZW50TGFuZ3VhZ2UgPT09IGxhbmd1YWdlLmNvZGV9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtsYW5ndWFnZS5uYW1lfVxuICAgICAgICAgICAgPC9NZW51SXRlbT5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9NZW51PlxuICAgICAgPC9Ub29sYmFyPlxuICAgIDwvQXBwQmFyPlxuICApO1xufSJdLCJuYW1lcyI6WyJ1c2VTdGF0ZSIsIkFwcEJhciIsIlRvb2xiYXIiLCJUeXBvZ3JhcGh5IiwiQnV0dG9uIiwiSWNvbkJ1dHRvbiIsIk1lbnUiLCJNZW51SXRlbSIsIkJveCIsInVzZU1lZGlhUXVlcnkiLCJ1c2VUaGVtZSIsIk1lbnVJY29uIiwiVHJhbnNsYXRlSWNvbiIsIkxpbmsiLCJsYW5ndWFnZXMiLCJuYW1lIiwiY29kZSIsIkhlYWRlciIsImN1cnJlbnRMYW5ndWFnZSIsInNldExhbmd1YWdlIiwibW9iaWxlTWVudUFuY2hvckVsIiwic2V0TW9iaWxlTWVudUFuY2hvckVsIiwibGFuZ3VhZ2VNZW51QW5jaG9yRWwiLCJzZXRMYW5ndWFnZU1lbnVBbmNob3JFbCIsInRoZW1lIiwiaXNNb2JpbGUiLCJicmVha3BvaW50cyIsImRvd24iLCJoYW5kbGVNb2JpbGVNZW51T3BlbiIsImV2ZW50IiwiY3VycmVudFRhcmdldCIsImhhbmRsZU1vYmlsZU1lbnVDbG9zZSIsImhhbmRsZUxhbmd1YWdlTWVudU9wZW4iLCJoYW5kbGVMYW5ndWFnZU1lbnVDbG9zZSIsImhhbmRsZUxhbmd1YWdlU2VsZWN0IiwicG9zaXRpb24iLCJjb2xvciIsImVsZXZhdGlvbiIsInN4IiwiYmFja2dyb3VuZENvbG9yIiwiaHJlZiIsInBhc3NIcmVmIiwiZGlzcGxheSIsImFsaWduSXRlbXMiLCJjdXJzb3IiLCJ2YXJpYW50IiwiY29tcG9uZW50IiwiZmxleEdyb3ciLCJwYWxldHRlIiwicHJpbWFyeSIsIm1haW4iLCJmb250V2VpZ2h0IiwiZm9udEZhbWlseSIsImVkZ2UiLCJhcmlhLWxhYmVsIiwib25DbGljayIsImFuY2hvckVsIiwib3BlbiIsIkJvb2xlYW4iLCJvbkNsb3NlIiwiZ2FwIiwidGV4dCIsInNlY29uZGFyeSIsInN0YXJ0SWNvbiIsImZpbmQiLCJsYW5nIiwibWFwIiwibGFuZ3VhZ2UiLCJzZWxlY3RlZCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(pages-dir-node)/./components/layout/Header.js\n");

/***/ }),

/***/ "(pages-dir-node)/./components/layout/Layout.js":
/*!*************************************!*\
  !*** ./components/layout/Layout.js ***!
  \*************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Layout)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/head */ \"(pages-dir-node)/./node_modules/next/head.js\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Header__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Header */ \"(pages-dir-node)/./components/layout/Header.js\");\n/* harmony import */ var _barrel_optimize_names_Box_Container_mui_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! __barrel_optimize__?names=Box,Container!=!@mui/material */ \"(pages-dir-node)/__barrel_optimize__?names=Box,Container!=!./node_modules/@mui/material/esm/index.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_Header__WEBPACK_IMPORTED_MODULE_3__, _barrel_optimize_names_Box_Container_mui_material__WEBPACK_IMPORTED_MODULE_4__]);\n([_Header__WEBPACK_IMPORTED_MODULE_3__, _barrel_optimize_names_Box_Container_mui_material__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\n\nfunction Layout({ children, title = 'NyayaBot - Your AI Legal Assistant' }) {\n    const [currentLanguage, setCurrentLanguage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('en');\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_2___default()), {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"title\", {\n                    children: title\n                }, void 0, false, {\n                    fileName: \"/home/runner/workspace/components/layout/Layout.js\",\n                    lineNumber: 12,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"/home/runner/workspace/components/layout/Layout.js\",\n                lineNumber: 11,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Container_mui_material__WEBPACK_IMPORTED_MODULE_4__.Box, {\n                sx: {\n                    display: 'flex',\n                    flexDirection: 'column',\n                    minHeight: '100vh'\n                },\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Header__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                        currentLanguage: currentLanguage,\n                        setLanguage: setCurrentLanguage\n                    }, void 0, false, {\n                        fileName: \"/home/runner/workspace/components/layout/Layout.js\",\n                        lineNumber: 15,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Container_mui_material__WEBPACK_IMPORTED_MODULE_4__.Container, {\n                        component: \"main\",\n                        maxWidth: \"lg\",\n                        sx: {\n                            flexGrow: 1,\n                            py: 4\n                        },\n                        children: children\n                    }, void 0, false, {\n                        fileName: \"/home/runner/workspace/components/layout/Layout.js\",\n                        lineNumber: 16,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Container_mui_material__WEBPACK_IMPORTED_MODULE_4__.Box, {\n                        component: \"footer\",\n                        sx: {\n                            py: 3,\n                            textAlign: 'center',\n                            borderTop: '1px solid #eaeaea',\n                            mt: 'auto'\n                        },\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Container_mui_material__WEBPACK_IMPORTED_MODULE_4__.Container, {\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Container_mui_material__WEBPACK_IMPORTED_MODULE_4__.Box, {\n                                sx: {\n                                    fontSize: '0.875rem',\n                                    color: 'text.secondary'\n                                },\n                                children: [\n                                    \"\\xa9 \",\n                                    new Date().getFullYear(),\n                                    \" NyayaBot. All rights reserved. This AI assistant does not provide professional legal advice.\"\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/home/runner/workspace/components/layout/Layout.js\",\n                                lineNumber: 21,\n                                columnNumber: 13\n                            }, this)\n                        }, void 0, false, {\n                            fileName: \"/home/runner/workspace/components/layout/Layout.js\",\n                            lineNumber: 20,\n                            columnNumber: 11\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"/home/runner/workspace/components/layout/Layout.js\",\n                        lineNumber: 19,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/home/runner/workspace/components/layout/Layout.js\",\n                lineNumber: 14,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true);\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL2NvbXBvbmVudHMvbGF5b3V0L0xheW91dC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQWlDO0FBQ0o7QUFDQztBQUNpQjtBQUVoQyxTQUFTSyxPQUFPLEVBQUVDLFFBQVEsRUFBRUMsUUFBUSxvQ0FBb0MsRUFBRTtJQUN2RixNQUFNLENBQUNDLGlCQUFpQkMsbUJBQW1CLEdBQUdULCtDQUFRQSxDQUFDO0lBRXZELHFCQUNFOzswQkFDRSw4REFBQ0Msa0RBQUlBOzBCQUNILDRFQUFDTTs4QkFBT0E7Ozs7Ozs7Ozs7OzBCQUVWLDhEQUFDSCxrRkFBR0E7Z0JBQUNNLElBQUk7b0JBQUVDLFNBQVM7b0JBQVFDLGVBQWU7b0JBQVVDLFdBQVc7Z0JBQVE7O2tDQUN0RSw4REFBQ1gsK0NBQU1BO3dCQUFDTSxpQkFBaUJBO3dCQUFpQk0sYUFBYUw7Ozs7OztrQ0FDdkQsOERBQUNOLHdGQUFTQTt3QkFBQ1ksV0FBVTt3QkFBT0MsVUFBUzt3QkFBS04sSUFBSTs0QkFBRU8sVUFBVTs0QkFBR0MsSUFBSTt3QkFBRTtrQ0FDaEVaOzs7Ozs7a0NBRUgsOERBQUNGLGtGQUFHQTt3QkFBQ1csV0FBVTt3QkFBU0wsSUFBSTs0QkFBRVEsSUFBSTs0QkFBR0MsV0FBVzs0QkFBVUMsV0FBVzs0QkFBcUJDLElBQUk7d0JBQU87a0NBQ25HLDRFQUFDbEIsd0ZBQVNBO3NDQUNSLDRFQUFDQyxrRkFBR0E7Z0NBQUNNLElBQUk7b0NBQUVZLFVBQVU7b0NBQVlDLE9BQU87Z0NBQWlCOztvQ0FBRztvQ0FDdkQsSUFBSUMsT0FBT0MsV0FBVztvQ0FBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU8xQyIsInNvdXJjZXMiOlsiL2hvbWUvcnVubmVyL3dvcmtzcGFjZS9jb21wb25lbnRzL2xheW91dC9MYXlvdXQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgSGVhZCBmcm9tICduZXh0L2hlYWQnO1xuaW1wb3J0IEhlYWRlciBmcm9tICcuL0hlYWRlcic7XG5pbXBvcnQgeyBDb250YWluZXIsIEJveCB9IGZyb20gJ0BtdWkvbWF0ZXJpYWwnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBMYXlvdXQoeyBjaGlsZHJlbiwgdGl0bGUgPSAnTnlheWFCb3QgLSBZb3VyIEFJIExlZ2FsIEFzc2lzdGFudCcgfSkge1xuICBjb25zdCBbY3VycmVudExhbmd1YWdlLCBzZXRDdXJyZW50TGFuZ3VhZ2VdID0gdXNlU3RhdGUoJ2VuJyk7XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPEhlYWQ+XG4gICAgICAgIDx0aXRsZT57dGl0bGV9PC90aXRsZT5cbiAgICAgIDwvSGVhZD5cbiAgICAgIDxCb3ggc3g9e3sgZGlzcGxheTogJ2ZsZXgnLCBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJywgbWluSGVpZ2h0OiAnMTAwdmgnIH19PlxuICAgICAgICA8SGVhZGVyIGN1cnJlbnRMYW5ndWFnZT17Y3VycmVudExhbmd1YWdlfSBzZXRMYW5ndWFnZT17c2V0Q3VycmVudExhbmd1YWdlfSAvPlxuICAgICAgICA8Q29udGFpbmVyIGNvbXBvbmVudD1cIm1haW5cIiBtYXhXaWR0aD1cImxnXCIgc3g9e3sgZmxleEdyb3c6IDEsIHB5OiA0IH19PlxuICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgPC9Db250YWluZXI+XG4gICAgICAgIDxCb3ggY29tcG9uZW50PVwiZm9vdGVyXCIgc3g9e3sgcHk6IDMsIHRleHRBbGlnbjogJ2NlbnRlcicsIGJvcmRlclRvcDogJzFweCBzb2xpZCAjZWFlYWVhJywgbXQ6ICdhdXRvJyB9fT5cbiAgICAgICAgICA8Q29udGFpbmVyPlxuICAgICAgICAgICAgPEJveCBzeD17eyBmb250U2l6ZTogJzAuODc1cmVtJywgY29sb3I6ICd0ZXh0LnNlY29uZGFyeScgfX0+XG4gICAgICAgICAgICAgIMKpIHtuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCl9IE55YXlhQm90LiBBbGwgcmlnaHRzIHJlc2VydmVkLiBUaGlzIEFJIGFzc2lzdGFudCBkb2VzIG5vdCBwcm92aWRlIHByb2Zlc3Npb25hbCBsZWdhbCBhZHZpY2UuXG4gICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICA8L0NvbnRhaW5lcj5cbiAgICAgICAgPC9Cb3g+XG4gICAgICA8L0JveD5cbiAgICA8Lz5cbiAgKTtcbn0iXSwibmFtZXMiOlsidXNlU3RhdGUiLCJIZWFkIiwiSGVhZGVyIiwiQ29udGFpbmVyIiwiQm94IiwiTGF5b3V0IiwiY2hpbGRyZW4iLCJ0aXRsZSIsImN1cnJlbnRMYW5ndWFnZSIsInNldEN1cnJlbnRMYW5ndWFnZSIsInN4IiwiZGlzcGxheSIsImZsZXhEaXJlY3Rpb24iLCJtaW5IZWlnaHQiLCJzZXRMYW5ndWFnZSIsImNvbXBvbmVudCIsIm1heFdpZHRoIiwiZmxleEdyb3ciLCJweSIsInRleHRBbGlnbiIsImJvcmRlclRvcCIsIm10IiwiZm9udFNpemUiLCJjb2xvciIsIkRhdGUiLCJnZXRGdWxsWWVhciJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(pages-dir-node)/./components/layout/Layout.js\n");

/***/ }),

/***/ "(pages-dir-node)/./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES&page=%2Fupload&preferredRegion=&absolutePagePath=.%2Fpages%2Fupload.js&absoluteAppPath=private-next-pages%2F_app&absoluteDocumentPath=private-next-pages%2F_document&middlewareConfigBase64=e30%3D!":
/*!************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES&page=%2Fupload&preferredRegion=&absolutePagePath=.%2Fpages%2Fupload.js&absoluteAppPath=private-next-pages%2F_app&absoluteDocumentPath=private-next-pages%2F_document&middlewareConfigBase64=e30%3D! ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   config: () => (/* binding */ config),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   getServerSideProps: () => (/* binding */ getServerSideProps),\n/* harmony export */   getStaticPaths: () => (/* binding */ getStaticPaths),\n/* harmony export */   getStaticProps: () => (/* binding */ getStaticProps),\n/* harmony export */   reportWebVitals: () => (/* binding */ reportWebVitals),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   unstable_getServerProps: () => (/* binding */ unstable_getServerProps),\n/* harmony export */   unstable_getServerSideProps: () => (/* binding */ unstable_getServerSideProps),\n/* harmony export */   unstable_getStaticParams: () => (/* binding */ unstable_getStaticParams),\n/* harmony export */   unstable_getStaticPaths: () => (/* binding */ unstable_getStaticPaths),\n/* harmony export */   unstable_getStaticProps: () => (/* binding */ unstable_getStaticProps)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_pages_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/pages/module.compiled */ \"(pages-dir-node)/./node_modules/next/dist/server/route-modules/pages/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_pages_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_pages_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(pages-dir-node)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/build/templates/helpers */ \"(pages-dir-node)/./node_modules/next/dist/build/templates/helpers.js\");\n/* harmony import */ var private_next_pages_document__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! private-next-pages/_document */ \"(pages-dir-node)/./pages/_document.js\");\n/* harmony import */ var private_next_pages_app__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! private-next-pages/_app */ \"(pages-dir-node)/./pages/_app.js\");\n/* harmony import */ var _pages_upload_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pages/upload.js */ \"(pages-dir-node)/./pages/upload.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([private_next_pages_app__WEBPACK_IMPORTED_MODULE_4__, _pages_upload_js__WEBPACK_IMPORTED_MODULE_5__]);\n([private_next_pages_app__WEBPACK_IMPORTED_MODULE_4__, _pages_upload_js__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n// Import the app and document modules.\n\n\n// Import the userland code.\n\n// Re-export the component (should be the default export).\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_upload_js__WEBPACK_IMPORTED_MODULE_5__, 'default'));\n// Re-export methods.\nconst getStaticProps = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_upload_js__WEBPACK_IMPORTED_MODULE_5__, 'getStaticProps');\nconst getStaticPaths = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_upload_js__WEBPACK_IMPORTED_MODULE_5__, 'getStaticPaths');\nconst getServerSideProps = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_upload_js__WEBPACK_IMPORTED_MODULE_5__, 'getServerSideProps');\nconst config = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_upload_js__WEBPACK_IMPORTED_MODULE_5__, 'config');\nconst reportWebVitals = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_upload_js__WEBPACK_IMPORTED_MODULE_5__, 'reportWebVitals');\n// Re-export legacy methods.\nconst unstable_getStaticProps = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_upload_js__WEBPACK_IMPORTED_MODULE_5__, 'unstable_getStaticProps');\nconst unstable_getStaticPaths = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_upload_js__WEBPACK_IMPORTED_MODULE_5__, 'unstable_getStaticPaths');\nconst unstable_getStaticParams = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_upload_js__WEBPACK_IMPORTED_MODULE_5__, 'unstable_getStaticParams');\nconst unstable_getServerProps = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_upload_js__WEBPACK_IMPORTED_MODULE_5__, 'unstable_getServerProps');\nconst unstable_getServerSideProps = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_upload_js__WEBPACK_IMPORTED_MODULE_5__, 'unstable_getServerSideProps');\n// Create and export the route module that will be consumed.\nconst routeModule = new next_dist_server_route_modules_pages_module_compiled__WEBPACK_IMPORTED_MODULE_0__.PagesRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.PAGES,\n        page: \"/upload\",\n        pathname: \"/upload\",\n        // The following aren't used in production.\n        bundlePath: '',\n        filename: ''\n    },\n    components: {\n        // default export might not exist when optimized for data only\n        App: private_next_pages_app__WEBPACK_IMPORTED_MODULE_4__[\"default\"],\n        Document: private_next_pages_document__WEBPACK_IMPORTED_MODULE_3__[\"default\"]\n    },\n    userland: _pages_upload_js__WEBPACK_IMPORTED_MODULE_5__\n});\n\n//# sourceMappingURL=pages.js.map\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL25vZGVfbW9kdWxlcy9uZXh0L2Rpc3QvYnVpbGQvd2VicGFjay9sb2FkZXJzL25leHQtcm91dGUtbG9hZGVyL2luZGV4LmpzP2tpbmQ9UEFHRVMmcGFnZT0lMkZ1cGxvYWQmcHJlZmVycmVkUmVnaW9uPSZhYnNvbHV0ZVBhZ2VQYXRoPS4lMkZwYWdlcyUyRnVwbG9hZC5qcyZhYnNvbHV0ZUFwcFBhdGg9cHJpdmF0ZS1uZXh0LXBhZ2VzJTJGX2FwcCZhYnNvbHV0ZURvY3VtZW50UGF0aD1wcml2YXRlLW5leHQtcGFnZXMlMkZfZG9jdW1lbnQmbWlkZGxld2FyZUNvbmZpZ0Jhc2U2ND1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBd0Y7QUFDaEM7QUFDRTtBQUMxRDtBQUN5RDtBQUNWO0FBQy9DO0FBQzhDO0FBQzlDO0FBQ0EsaUVBQWUsd0VBQUssQ0FBQyw2Q0FBUSxZQUFZLEVBQUM7QUFDMUM7QUFDTyx1QkFBdUIsd0VBQUssQ0FBQyw2Q0FBUTtBQUNyQyx1QkFBdUIsd0VBQUssQ0FBQyw2Q0FBUTtBQUNyQywyQkFBMkIsd0VBQUssQ0FBQyw2Q0FBUTtBQUN6QyxlQUFlLHdFQUFLLENBQUMsNkNBQVE7QUFDN0Isd0JBQXdCLHdFQUFLLENBQUMsNkNBQVE7QUFDN0M7QUFDTyxnQ0FBZ0Msd0VBQUssQ0FBQyw2Q0FBUTtBQUM5QyxnQ0FBZ0Msd0VBQUssQ0FBQyw2Q0FBUTtBQUM5QyxpQ0FBaUMsd0VBQUssQ0FBQyw2Q0FBUTtBQUMvQyxnQ0FBZ0Msd0VBQUssQ0FBQyw2Q0FBUTtBQUM5QyxvQ0FBb0Msd0VBQUssQ0FBQyw2Q0FBUTtBQUN6RDtBQUNPLHdCQUF3QixrR0FBZ0I7QUFDL0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQWEsOERBQVc7QUFDeEIsa0JBQWtCLG1FQUFnQjtBQUNsQyxLQUFLO0FBQ0wsWUFBWTtBQUNaLENBQUM7O0FBRUQsaUMiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQYWdlc1JvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9wYWdlcy9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IGhvaXN0IH0gZnJvbSBcIm5leHQvZGlzdC9idWlsZC90ZW1wbGF0ZXMvaGVscGVyc1wiO1xuLy8gSW1wb3J0IHRoZSBhcHAgYW5kIGRvY3VtZW50IG1vZHVsZXMuXG5pbXBvcnQgKiBhcyBkb2N1bWVudCBmcm9tIFwicHJpdmF0ZS1uZXh0LXBhZ2VzL19kb2N1bWVudFwiO1xuaW1wb3J0ICogYXMgYXBwIGZyb20gXCJwcml2YXRlLW5leHQtcGFnZXMvX2FwcFwiO1xuLy8gSW1wb3J0IHRoZSB1c2VybGFuZCBjb2RlLlxuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIi4vcGFnZXMvdXBsb2FkLmpzXCI7XG4vLyBSZS1leHBvcnQgdGhlIGNvbXBvbmVudCAoc2hvdWxkIGJlIHRoZSBkZWZhdWx0IGV4cG9ydCkuXG5leHBvcnQgZGVmYXVsdCBob2lzdCh1c2VybGFuZCwgJ2RlZmF1bHQnKTtcbi8vIFJlLWV4cG9ydCBtZXRob2RzLlxuZXhwb3J0IGNvbnN0IGdldFN0YXRpY1Byb3BzID0gaG9pc3QodXNlcmxhbmQsICdnZXRTdGF0aWNQcm9wcycpO1xuZXhwb3J0IGNvbnN0IGdldFN0YXRpY1BhdGhzID0gaG9pc3QodXNlcmxhbmQsICdnZXRTdGF0aWNQYXRocycpO1xuZXhwb3J0IGNvbnN0IGdldFNlcnZlclNpZGVQcm9wcyA9IGhvaXN0KHVzZXJsYW5kLCAnZ2V0U2VydmVyU2lkZVByb3BzJyk7XG5leHBvcnQgY29uc3QgY29uZmlnID0gaG9pc3QodXNlcmxhbmQsICdjb25maWcnKTtcbmV4cG9ydCBjb25zdCByZXBvcnRXZWJWaXRhbHMgPSBob2lzdCh1c2VybGFuZCwgJ3JlcG9ydFdlYlZpdGFscycpO1xuLy8gUmUtZXhwb3J0IGxlZ2FjeSBtZXRob2RzLlxuZXhwb3J0IGNvbnN0IHVuc3RhYmxlX2dldFN0YXRpY1Byb3BzID0gaG9pc3QodXNlcmxhbmQsICd1bnN0YWJsZV9nZXRTdGF0aWNQcm9wcycpO1xuZXhwb3J0IGNvbnN0IHVuc3RhYmxlX2dldFN0YXRpY1BhdGhzID0gaG9pc3QodXNlcmxhbmQsICd1bnN0YWJsZV9nZXRTdGF0aWNQYXRocycpO1xuZXhwb3J0IGNvbnN0IHVuc3RhYmxlX2dldFN0YXRpY1BhcmFtcyA9IGhvaXN0KHVzZXJsYW5kLCAndW5zdGFibGVfZ2V0U3RhdGljUGFyYW1zJyk7XG5leHBvcnQgY29uc3QgdW5zdGFibGVfZ2V0U2VydmVyUHJvcHMgPSBob2lzdCh1c2VybGFuZCwgJ3Vuc3RhYmxlX2dldFNlcnZlclByb3BzJyk7XG5leHBvcnQgY29uc3QgdW5zdGFibGVfZ2V0U2VydmVyU2lkZVByb3BzID0gaG9pc3QodXNlcmxhbmQsICd1bnN0YWJsZV9nZXRTZXJ2ZXJTaWRlUHJvcHMnKTtcbi8vIENyZWF0ZSBhbmQgZXhwb3J0IHRoZSByb3V0ZSBtb2R1bGUgdGhhdCB3aWxsIGJlIGNvbnN1bWVkLlxuZXhwb3J0IGNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IFBhZ2VzUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLlBBR0VTLFxuICAgICAgICBwYWdlOiBcIi91cGxvYWRcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL3VwbG9hZFwiLFxuICAgICAgICAvLyBUaGUgZm9sbG93aW5nIGFyZW4ndCB1c2VkIGluIHByb2R1Y3Rpb24uXG4gICAgICAgIGJ1bmRsZVBhdGg6ICcnLFxuICAgICAgICBmaWxlbmFtZTogJydcbiAgICB9LFxuICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgLy8gZGVmYXVsdCBleHBvcnQgbWlnaHQgbm90IGV4aXN0IHdoZW4gb3B0aW1pemVkIGZvciBkYXRhIG9ubHlcbiAgICAgICAgQXBwOiBhcHAuZGVmYXVsdCxcbiAgICAgICAgRG9jdW1lbnQ6IGRvY3VtZW50LmRlZmF1bHRcbiAgICB9LFxuICAgIHVzZXJsYW5kXG59KTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGFnZXMuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(pages-dir-node)/./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES&page=%2Fupload&preferredRegion=&absolutePagePath=.%2Fpages%2Fupload.js&absoluteAppPath=private-next-pages%2F_app&absoluteDocumentPath=private-next-pages%2F_document&middlewareConfigBase64=e30%3D!\n");

/***/ }),

/***/ "(pages-dir-node)/./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/globals.css */ \"(pages-dir-node)/./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/material/styles */ \"(pages-dir-node)/./node_modules/@mui/material/esm/styles/index.js\");\n/* harmony import */ var _mui_material_CssBaseline__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/material/CssBaseline */ \"(pages-dir-node)/./node_modules/@mui/material/esm/CssBaseline/index.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_mui_material_styles__WEBPACK_IMPORTED_MODULE_2__, _mui_material_CssBaseline__WEBPACK_IMPORTED_MODULE_3__]);\n([_mui_material_styles__WEBPACK_IMPORTED_MODULE_2__, _mui_material_CssBaseline__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\n// Create a theme instance\nconst theme = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_2__.createTheme)({\n    palette: {\n        primary: {\n            main: '#FF6B35',\n            dark: '#E34F16'\n        },\n        secondary: {\n            main: '#4C5B5C',\n            light: '#717F80'\n        },\n        accent: {\n            main: '#1A659E',\n            light: '#2A95E5'\n        },\n        background: {\n            default: '#F7F9FC',\n            paper: '#FFFFFF'\n        },\n        text: {\n            primary: '#02044A',\n            secondary: '#4C5B5C'\n        }\n    },\n    typography: {\n        fontFamily: [\n            'Inter',\n            '-apple-system',\n            'BlinkMacSystemFont',\n            '\"Segoe UI\"',\n            'Roboto',\n            '\"Helvetica Neue\"',\n            'Arial',\n            'sans-serif'\n        ].join(','),\n        h1: {\n            fontFamily: 'Poppins, sans-serif',\n            fontWeight: 700\n        },\n        h2: {\n            fontFamily: 'Poppins, sans-serif',\n            fontWeight: 700\n        },\n        h3: {\n            fontFamily: 'Poppins, sans-serif',\n            fontWeight: 600\n        },\n        h4: {\n            fontFamily: 'Poppins, sans-serif',\n            fontWeight: 600\n        },\n        h5: {\n            fontFamily: 'Poppins, sans-serif',\n            fontWeight: 500\n        },\n        h6: {\n            fontFamily: 'Poppins, sans-serif',\n            fontWeight: 500\n        }\n    },\n    components: {\n        MuiButton: {\n            styleOverrides: {\n                root: {\n                    borderRadius: 8,\n                    textTransform: 'none',\n                    padding: '10px 20px',\n                    fontWeight: 500\n                }\n            }\n        },\n        MuiPaper: {\n            styleOverrides: {\n                root: {\n                    borderRadius: 8,\n                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)'\n                }\n            }\n        }\n    }\n});\nfunction MyApp({ Component, pageProps }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material_styles__WEBPACK_IMPORTED_MODULE_2__.ThemeProvider, {\n        theme: theme,\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material_CssBaseline__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {}, void 0, false, {\n                fileName: \"/home/runner/workspace/pages/_app.js\",\n                lineNumber: 90,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                ...pageProps\n            }, void 0, false, {\n                fileName: \"/home/runner/workspace/pages/_app.js\",\n                lineNumber: 91,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/home/runner/workspace/pages/_app.js\",\n        lineNumber: 89,\n        columnNumber: 5\n    }, this);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3BhZ2VzL19hcHAuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0I7QUFDbUM7QUFDZDtBQUVwRCwwQkFBMEI7QUFDMUIsTUFBTUcsUUFBUUYsaUVBQVdBLENBQUM7SUFDeEJHLFNBQVM7UUFDUEMsU0FBUztZQUNQQyxNQUFNO1lBQ05DLE1BQU07UUFDUjtRQUNBQyxXQUFXO1lBQ1RGLE1BQU07WUFDTkcsT0FBTztRQUNUO1FBQ0FDLFFBQVE7WUFDTkosTUFBTTtZQUNORyxPQUFPO1FBQ1Q7UUFDQUUsWUFBWTtZQUNWQyxTQUFTO1lBQ1RDLE9BQU87UUFDVDtRQUNBQyxNQUFNO1lBQ0pULFNBQVM7WUFDVEcsV0FBVztRQUNiO0lBQ0Y7SUFDQU8sWUFBWTtRQUNWQyxZQUFZO1lBQ1Y7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtTQUNELENBQUNDLElBQUksQ0FBQztRQUNQQyxJQUFJO1lBQ0ZGLFlBQVk7WUFDWkcsWUFBWTtRQUNkO1FBQ0FDLElBQUk7WUFDRkosWUFBWTtZQUNaRyxZQUFZO1FBQ2Q7UUFDQUUsSUFBSTtZQUNGTCxZQUFZO1lBQ1pHLFlBQVk7UUFDZDtRQUNBRyxJQUFJO1lBQ0ZOLFlBQVk7WUFDWkcsWUFBWTtRQUNkO1FBQ0FJLElBQUk7WUFDRlAsWUFBWTtZQUNaRyxZQUFZO1FBQ2Q7UUFDQUssSUFBSTtZQUNGUixZQUFZO1lBQ1pHLFlBQVk7UUFDZDtJQUNGO0lBQ0FNLFlBQVk7UUFDVkMsV0FBVztZQUNUQyxnQkFBZ0I7Z0JBQ2RDLE1BQU07b0JBQ0pDLGNBQWM7b0JBQ2RDLGVBQWU7b0JBQ2ZDLFNBQVM7b0JBQ1RaLFlBQVk7Z0JBQ2Q7WUFDRjtRQUNGO1FBQ0FhLFVBQVU7WUFDUkwsZ0JBQWdCO2dCQUNkQyxNQUFNO29CQUNKQyxjQUFjO29CQUNkSSxXQUFXO2dCQUNiO1lBQ0Y7UUFDRjtJQUNGO0FBQ0Y7QUFFQSxTQUFTQyxNQUFNLEVBQUVDLFNBQVMsRUFBRUMsU0FBUyxFQUFFO0lBQ3JDLHFCQUNFLDhEQUFDcEMsK0RBQWFBO1FBQUNHLE9BQU9BOzswQkFDcEIsOERBQUNELGlFQUFXQTs7Ozs7MEJBQ1osOERBQUNpQztnQkFBVyxHQUFHQyxTQUFTOzs7Ozs7Ozs7Ozs7QUFHOUI7QUFFQSxpRUFBZUYsS0FBS0EsRUFBQyIsInNvdXJjZXMiOlsiL2hvbWUvcnVubmVyL3dvcmtzcGFjZS9wYWdlcy9fYXBwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnLi4vc3R5bGVzL2dsb2JhbHMuY3NzJztcbmltcG9ydCB7IFRoZW1lUHJvdmlkZXIsIGNyZWF0ZVRoZW1lIH0gZnJvbSAnQG11aS9tYXRlcmlhbC9zdHlsZXMnO1xuaW1wb3J0IENzc0Jhc2VsaW5lIGZyb20gJ0BtdWkvbWF0ZXJpYWwvQ3NzQmFzZWxpbmUnO1xuXG4vLyBDcmVhdGUgYSB0aGVtZSBpbnN0YW5jZVxuY29uc3QgdGhlbWUgPSBjcmVhdGVUaGVtZSh7XG4gIHBhbGV0dGU6IHtcbiAgICBwcmltYXJ5OiB7XG4gICAgICBtYWluOiAnI0ZGNkIzNScsXG4gICAgICBkYXJrOiAnI0UzNEYxNicsXG4gICAgfSxcbiAgICBzZWNvbmRhcnk6IHtcbiAgICAgIG1haW46ICcjNEM1QjVDJyxcbiAgICAgIGxpZ2h0OiAnIzcxN0Y4MCcsXG4gICAgfSxcbiAgICBhY2NlbnQ6IHtcbiAgICAgIG1haW46ICcjMUE2NTlFJyxcbiAgICAgIGxpZ2h0OiAnIzJBOTVFNScsXG4gICAgfSxcbiAgICBiYWNrZ3JvdW5kOiB7XG4gICAgICBkZWZhdWx0OiAnI0Y3RjlGQycsXG4gICAgICBwYXBlcjogJyNGRkZGRkYnLFxuICAgIH0sXG4gICAgdGV4dDoge1xuICAgICAgcHJpbWFyeTogJyMwMjA0NEEnLFxuICAgICAgc2Vjb25kYXJ5OiAnIzRDNUI1QycsXG4gICAgfSxcbiAgfSxcbiAgdHlwb2dyYXBoeToge1xuICAgIGZvbnRGYW1pbHk6IFtcbiAgICAgICdJbnRlcicsXG4gICAgICAnLWFwcGxlLXN5c3RlbScsXG4gICAgICAnQmxpbmtNYWNTeXN0ZW1Gb250JyxcbiAgICAgICdcIlNlZ29lIFVJXCInLFxuICAgICAgJ1JvYm90bycsXG4gICAgICAnXCJIZWx2ZXRpY2EgTmV1ZVwiJyxcbiAgICAgICdBcmlhbCcsXG4gICAgICAnc2Fucy1zZXJpZicsXG4gICAgXS5qb2luKCcsJyksXG4gICAgaDE6IHtcbiAgICAgIGZvbnRGYW1pbHk6ICdQb3BwaW5zLCBzYW5zLXNlcmlmJyxcbiAgICAgIGZvbnRXZWlnaHQ6IDcwMCxcbiAgICB9LFxuICAgIGgyOiB7XG4gICAgICBmb250RmFtaWx5OiAnUG9wcGlucywgc2Fucy1zZXJpZicsXG4gICAgICBmb250V2VpZ2h0OiA3MDAsXG4gICAgfSxcbiAgICBoMzoge1xuICAgICAgZm9udEZhbWlseTogJ1BvcHBpbnMsIHNhbnMtc2VyaWYnLFxuICAgICAgZm9udFdlaWdodDogNjAwLFxuICAgIH0sXG4gICAgaDQ6IHtcbiAgICAgIGZvbnRGYW1pbHk6ICdQb3BwaW5zLCBzYW5zLXNlcmlmJyxcbiAgICAgIGZvbnRXZWlnaHQ6IDYwMCxcbiAgICB9LFxuICAgIGg1OiB7XG4gICAgICBmb250RmFtaWx5OiAnUG9wcGlucywgc2Fucy1zZXJpZicsXG4gICAgICBmb250V2VpZ2h0OiA1MDAsXG4gICAgfSxcbiAgICBoNjoge1xuICAgICAgZm9udEZhbWlseTogJ1BvcHBpbnMsIHNhbnMtc2VyaWYnLFxuICAgICAgZm9udFdlaWdodDogNTAwLFxuICAgIH0sXG4gIH0sXG4gIGNvbXBvbmVudHM6IHtcbiAgICBNdWlCdXR0b246IHtcbiAgICAgIHN0eWxlT3ZlcnJpZGVzOiB7XG4gICAgICAgIHJvb3Q6IHtcbiAgICAgICAgICBib3JkZXJSYWRpdXM6IDgsXG4gICAgICAgICAgdGV4dFRyYW5zZm9ybTogJ25vbmUnLFxuICAgICAgICAgIHBhZGRpbmc6ICcxMHB4IDIwcHgnLFxuICAgICAgICAgIGZvbnRXZWlnaHQ6IDUwMCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBNdWlQYXBlcjoge1xuICAgICAgc3R5bGVPdmVycmlkZXM6IHtcbiAgICAgICAgcm9vdDoge1xuICAgICAgICAgIGJvcmRlclJhZGl1czogOCxcbiAgICAgICAgICBib3hTaGFkb3c6ICcwcHggNHB4IDIwcHggcmdiYSgwLCAwLCAwLCAwLjA1KScsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59KTtcblxuZnVuY3Rpb24gTXlBcHAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9KSB7XG4gIHJldHVybiAoXG4gICAgPFRoZW1lUHJvdmlkZXIgdGhlbWU9e3RoZW1lfT5cbiAgICAgIDxDc3NCYXNlbGluZSAvPlxuICAgICAgPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPlxuICAgIDwvVGhlbWVQcm92aWRlcj5cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgTXlBcHA7Il0sIm5hbWVzIjpbIlRoZW1lUHJvdmlkZXIiLCJjcmVhdGVUaGVtZSIsIkNzc0Jhc2VsaW5lIiwidGhlbWUiLCJwYWxldHRlIiwicHJpbWFyeSIsIm1haW4iLCJkYXJrIiwic2Vjb25kYXJ5IiwibGlnaHQiLCJhY2NlbnQiLCJiYWNrZ3JvdW5kIiwiZGVmYXVsdCIsInBhcGVyIiwidGV4dCIsInR5cG9ncmFwaHkiLCJmb250RmFtaWx5Iiwiam9pbiIsImgxIiwiZm9udFdlaWdodCIsImgyIiwiaDMiLCJoNCIsImg1IiwiaDYiLCJjb21wb25lbnRzIiwiTXVpQnV0dG9uIiwic3R5bGVPdmVycmlkZXMiLCJyb290IiwiYm9yZGVyUmFkaXVzIiwidGV4dFRyYW5zZm9ybSIsInBhZGRpbmciLCJNdWlQYXBlciIsImJveFNoYWRvdyIsIk15QXBwIiwiQ29tcG9uZW50IiwicGFnZVByb3BzIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(pages-dir-node)/./pages/_app.js\n");

/***/ }),

/***/ "(pages-dir-node)/./pages/_document.js":
/*!****************************!*\
  !*** ./pages/_document.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Document)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/document */ \"(pages-dir-node)/./node_modules/next/document.js\");\n/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_document__WEBPACK_IMPORTED_MODULE_1__);\n\n\nfunction Document() {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_1__.Html, {\n        lang: \"en\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_1__.Head, {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n                        charSet: \"utf-8\"\n                    }, void 0, false, {\n                        fileName: \"/home/runner/workspace/pages/_document.js\",\n                        lineNumber: 7,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n                        rel: \"icon\",\n                        href: \"/favicon.ico\"\n                    }, void 0, false, {\n                        fileName: \"/home/runner/workspace/pages/_document.js\",\n                        lineNumber: 8,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n                        rel: \"preconnect\",\n                        href: \"https://fonts.googleapis.com\"\n                    }, void 0, false, {\n                        fileName: \"/home/runner/workspace/pages/_document.js\",\n                        lineNumber: 9,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n                        rel: \"preconnect\",\n                        href: \"https://fonts.gstatic.com\",\n                        crossOrigin: \"true\"\n                    }, void 0, false, {\n                        fileName: \"/home/runner/workspace/pages/_document.js\",\n                        lineNumber: 10,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n                        href: \"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700&display=swap\",\n                        rel: \"stylesheet\"\n                    }, void 0, false, {\n                        fileName: \"/home/runner/workspace/pages/_document.js\",\n                        lineNumber: 11,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n                        name: \"description\",\n                        content: \"NyayaBot - Your AI Legal Assistant for Indian law\"\n                    }, void 0, false, {\n                        fileName: \"/home/runner/workspace/pages/_document.js\",\n                        lineNumber: 15,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/home/runner/workspace/pages/_document.js\",\n                lineNumber: 6,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"body\", {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_1__.Main, {}, void 0, false, {\n                        fileName: \"/home/runner/workspace/pages/_document.js\",\n                        lineNumber: 18,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_1__.NextScript, {}, void 0, false, {\n                        fileName: \"/home/runner/workspace/pages/_document.js\",\n                        lineNumber: 19,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/home/runner/workspace/pages/_document.js\",\n                lineNumber: 17,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/home/runner/workspace/pages/_document.js\",\n        lineNumber: 5,\n        columnNumber: 5\n    }, this);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3BhZ2VzL19kb2N1bWVudC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBNkQ7QUFFOUMsU0FBU0k7SUFDdEIscUJBQ0UsOERBQUNKLCtDQUFJQTtRQUFDSyxNQUFLOzswQkFDVCw4REFBQ0osK0NBQUlBOztrQ0FDSCw4REFBQ0s7d0JBQUtDLFNBQVE7Ozs7OztrQ0FDZCw4REFBQ0M7d0JBQUtDLEtBQUk7d0JBQU9DLE1BQUs7Ozs7OztrQ0FDdEIsOERBQUNGO3dCQUFLQyxLQUFJO3dCQUFhQyxNQUFLOzs7Ozs7a0NBQzVCLDhEQUFDRjt3QkFBS0MsS0FBSTt3QkFBYUMsTUFBSzt3QkFBNEJDLGFBQVk7Ozs7OztrQ0FDcEUsOERBQUNIO3dCQUNDRSxNQUFLO3dCQUNMRCxLQUFJOzs7Ozs7a0NBRU4sOERBQUNIO3dCQUFLTSxNQUFLO3dCQUFjQyxTQUFROzs7Ozs7Ozs7Ozs7MEJBRW5DLDhEQUFDQzs7a0NBQ0MsOERBQUNaLCtDQUFJQTs7Ozs7a0NBQ0wsOERBQUNDLHFEQUFVQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJbkIiLCJzb3VyY2VzIjpbIi9ob21lL3J1bm5lci93b3Jrc3BhY2UvcGFnZXMvX2RvY3VtZW50LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0bWwsIEhlYWQsIE1haW4sIE5leHRTY3JpcHQgfSBmcm9tICduZXh0L2RvY3VtZW50JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRG9jdW1lbnQoKSB7XG4gIHJldHVybiAoXG4gICAgPEh0bWwgbGFuZz1cImVuXCI+XG4gICAgICA8SGVhZD5cbiAgICAgICAgPG1ldGEgY2hhclNldD1cInV0Zi04XCIgLz5cbiAgICAgICAgPGxpbmsgcmVsPVwiaWNvblwiIGhyZWY9XCIvZmF2aWNvbi5pY29cIiAvPlxuICAgICAgICA8bGluayByZWw9XCJwcmVjb25uZWN0XCIgaHJlZj1cImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb21cIiAvPlxuICAgICAgICA8bGluayByZWw9XCJwcmVjb25uZWN0XCIgaHJlZj1cImh0dHBzOi8vZm9udHMuZ3N0YXRpYy5jb21cIiBjcm9zc09yaWdpbj1cInRydWVcIiAvPlxuICAgICAgICA8bGlua1xuICAgICAgICAgIGhyZWY9XCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PUludGVyOndnaHRANDAwOzUwMDs2MDA7NzAwJmZhbWlseT1Qb3BwaW5zOndnaHRANTAwOzYwMDs3MDAmZGlzcGxheT1zd2FwXCJcbiAgICAgICAgICByZWw9XCJzdHlsZXNoZWV0XCJcbiAgICAgICAgLz5cbiAgICAgICAgPG1ldGEgbmFtZT1cImRlc2NyaXB0aW9uXCIgY29udGVudD1cIk55YXlhQm90IC0gWW91ciBBSSBMZWdhbCBBc3Npc3RhbnQgZm9yIEluZGlhbiBsYXdcIiAvPlxuICAgICAgPC9IZWFkPlxuICAgICAgPGJvZHk+XG4gICAgICAgIDxNYWluIC8+XG4gICAgICAgIDxOZXh0U2NyaXB0IC8+XG4gICAgICA8L2JvZHk+XG4gICAgPC9IdG1sPlxuICApO1xufSJdLCJuYW1lcyI6WyJIdG1sIiwiSGVhZCIsIk1haW4iLCJOZXh0U2NyaXB0IiwiRG9jdW1lbnQiLCJsYW5nIiwibWV0YSIsImNoYXJTZXQiLCJsaW5rIiwicmVsIiwiaHJlZiIsImNyb3NzT3JpZ2luIiwibmFtZSIsImNvbnRlbnQiLCJib2R5Il0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(pages-dir-node)/./pages/_document.js\n");

/***/ }),

/***/ "(pages-dir-node)/./pages/upload.js":
/*!*************************!*\
  !*** ./pages/upload.js ***!
  \*************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ UploadPage)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _components_layout_Layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/layout/Layout */ \"(pages-dir-node)/./components/layout/Layout.js\");\n/* harmony import */ var _components_document_DocumentUploader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/document/DocumentUploader */ \"(pages-dir-node)/./components/document/DocumentUploader.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_layout_Layout__WEBPACK_IMPORTED_MODULE_1__, _components_document_DocumentUploader__WEBPACK_IMPORTED_MODULE_2__]);\n([_components_layout_Layout__WEBPACK_IMPORTED_MODULE_1__, _components_document_DocumentUploader__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\nfunction UploadPage() {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_layout_Layout__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n        title: \"Upload Documents - NyayaBot\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_document_DocumentUploader__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {}, void 0, false, {\n            fileName: \"/home/runner/workspace/pages/upload.js\",\n            lineNumber: 7,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/home/runner/workspace/pages/upload.js\",\n        lineNumber: 6,\n        columnNumber: 5\n    }, this);\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3BhZ2VzL3VwbG9hZC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBaUQ7QUFDc0I7QUFFeEQsU0FBU0U7SUFDdEIscUJBQ0UsOERBQUNGLGlFQUFNQTtRQUFDRyxPQUFNO2tCQUNaLDRFQUFDRiw2RUFBZ0JBOzs7Ozs7Ozs7O0FBR3ZCIiwic291cmNlcyI6WyIvaG9tZS9ydW5uZXIvd29ya3NwYWNlL3BhZ2VzL3VwbG9hZC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTGF5b3V0IGZyb20gJy4uL2NvbXBvbmVudHMvbGF5b3V0L0xheW91dCc7XG5pbXBvcnQgRG9jdW1lbnRVcGxvYWRlciBmcm9tICcuLi9jb21wb25lbnRzL2RvY3VtZW50L0RvY3VtZW50VXBsb2FkZXInO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBVcGxvYWRQYWdlKCkge1xuICByZXR1cm4gKFxuICAgIDxMYXlvdXQgdGl0bGU9XCJVcGxvYWQgRG9jdW1lbnRzIC0gTnlheWFCb3RcIj5cbiAgICAgIDxEb2N1bWVudFVwbG9hZGVyIC8+XG4gICAgPC9MYXlvdXQ+XG4gICk7XG59Il0sIm5hbWVzIjpbIkxheW91dCIsIkRvY3VtZW50VXBsb2FkZXIiLCJVcGxvYWRQYWdlIiwidGl0bGUiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(pages-dir-node)/./pages/upload.js\n");

/***/ }),

/***/ "(pages-dir-node)/./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "(pages-dir-node)/__barrel_optimize__?names=Alert,Box,Button,CircularProgress,Collapse,Divider,IconButton,List,ListItem,ListItemText,Paper,Typography!=!./node_modules/@mui/material/esm/index.js":
/*!***************************************************************************************************************************************************************************************!*\
  !*** __barrel_optimize__?names=Alert,Box,Button,CircularProgress,Collapse,Divider,IconButton,List,ListItem,ListItemText,Paper,Typography!=!./node_modules/@mui/material/esm/index.js ***!
  \***************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Alert: () => (/* reexport safe */ _Alert_index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]),\n/* harmony export */   Box: () => (/* reexport safe */ _Box_index_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]),\n/* harmony export */   Button: () => (/* reexport safe */ _Button_index_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]),\n/* harmony export */   CircularProgress: () => (/* reexport safe */ _CircularProgress_index_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"]),\n/* harmony export */   Collapse: () => (/* reexport safe */ _Collapse_index_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"]),\n/* harmony export */   Divider: () => (/* reexport safe */ _Divider_index_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"]),\n/* harmony export */   IconButton: () => (/* reexport safe */ _IconButton_index_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"]),\n/* harmony export */   List: () => (/* reexport safe */ _List_index_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"]),\n/* harmony export */   ListItem: () => (/* reexport safe */ _ListItem_index_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"]),\n/* harmony export */   ListItemText: () => (/* reexport safe */ _ListItemText_index_js__WEBPACK_IMPORTED_MODULE_9__[\"default\"]),\n/* harmony export */   Paper: () => (/* reexport safe */ _Paper_index_js__WEBPACK_IMPORTED_MODULE_10__[\"default\"]),\n/* harmony export */   Typography: () => (/* reexport safe */ _Typography_index_js__WEBPACK_IMPORTED_MODULE_11__[\"default\"])\n/* harmony export */ });\n/* harmony import */ var _Alert_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Alert/index.js */ \"(pages-dir-node)/./node_modules/@mui/material/esm/Alert/index.js\");\n/* harmony import */ var _Box_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Box/index.js */ \"(pages-dir-node)/./node_modules/@mui/material/esm/Box/index.js\");\n/* harmony import */ var _Button_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Button/index.js */ \"(pages-dir-node)/./node_modules/@mui/material/esm/Button/index.js\");\n/* harmony import */ var _CircularProgress_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CircularProgress/index.js */ \"(pages-dir-node)/./node_modules/@mui/material/esm/CircularProgress/index.js\");\n/* harmony import */ var _Collapse_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Collapse/index.js */ \"(pages-dir-node)/./node_modules/@mui/material/esm/Collapse/index.js\");\n/* harmony import */ var _Divider_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Divider/index.js */ \"(pages-dir-node)/./node_modules/@mui/material/esm/Divider/index.js\");\n/* harmony import */ var _IconButton_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./IconButton/index.js */ \"(pages-dir-node)/./node_modules/@mui/material/esm/IconButton/index.js\");\n/* harmony import */ var _List_index_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./List/index.js */ \"(pages-dir-node)/./node_modules/@mui/material/esm/List/index.js\");\n/* harmony import */ var _ListItem_index_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ListItem/index.js */ \"(pages-dir-node)/./node_modules/@mui/material/esm/ListItem/index.js\");\n/* harmony import */ var _ListItemText_index_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ListItemText/index.js */ \"(pages-dir-node)/./node_modules/@mui/material/esm/ListItemText/index.js\");\n/* harmony import */ var _Paper_index_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Paper/index.js */ \"(pages-dir-node)/./node_modules/@mui/material/esm/Paper/index.js\");\n/* harmony import */ var _Typography_index_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Typography/index.js */ \"(pages-dir-node)/./node_modules/@mui/material/esm/Typography/index.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_Alert_index_js__WEBPACK_IMPORTED_MODULE_0__, _Box_index_js__WEBPACK_IMPORTED_MODULE_1__, _Button_index_js__WEBPACK_IMPORTED_MODULE_2__, _CircularProgress_index_js__WEBPACK_IMPORTED_MODULE_3__, _Collapse_index_js__WEBPACK_IMPORTED_MODULE_4__, _Divider_index_js__WEBPACK_IMPORTED_MODULE_5__, _IconButton_index_js__WEBPACK_IMPORTED_MODULE_6__, _List_index_js__WEBPACK_IMPORTED_MODULE_7__, _ListItem_index_js__WEBPACK_IMPORTED_MODULE_8__, _ListItemText_index_js__WEBPACK_IMPORTED_MODULE_9__, _Paper_index_js__WEBPACK_IMPORTED_MODULE_10__, _Typography_index_js__WEBPACK_IMPORTED_MODULE_11__]);\n([_Alert_index_js__WEBPACK_IMPORTED_MODULE_0__, _Box_index_js__WEBPACK_IMPORTED_MODULE_1__, _Button_index_js__WEBPACK_IMPORTED_MODULE_2__, _CircularProgress_index_js__WEBPACK_IMPORTED_MODULE_3__, _Collapse_index_js__WEBPACK_IMPORTED_MODULE_4__, _Divider_index_js__WEBPACK_IMPORTED_MODULE_5__, _IconButton_index_js__WEBPACK_IMPORTED_MODULE_6__, _List_index_js__WEBPACK_IMPORTED_MODULE_7__, _ListItem_index_js__WEBPACK_IMPORTED_MODULE_8__, _ListItemText_index_js__WEBPACK_IMPORTED_MODULE_9__, _Paper_index_js__WEBPACK_IMPORTED_MODULE_10__, _Typography_index_js__WEBPACK_IMPORTED_MODULE_11__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\n\n\n\n\n\n\n\n\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS9fX2JhcnJlbF9vcHRpbWl6ZV9fP25hbWVzPUFsZXJ0LEJveCxCdXR0b24sQ2lyY3VsYXJQcm9ncmVzcyxDb2xsYXBzZSxEaXZpZGVyLEljb25CdXR0b24sTGlzdCxMaXN0SXRlbSxMaXN0SXRlbVRleHQsUGFwZXIsVHlwb2dyYXBoeSE9IS4vbm9kZV9tb2R1bGVzL0BtdWkvbWF0ZXJpYWwvZXNtL2luZGV4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDbUQ7QUFDSjtBQUNNO0FBQ29CO0FBQ2hCO0FBQ0Y7QUFDTTtBQUNaO0FBQ1E7QUFDUTtBQUNkIiwic291cmNlcyI6WyIvaG9tZS9ydW5uZXIvd29ya3NwYWNlL25vZGVfbW9kdWxlcy9AbXVpL21hdGVyaWFsL2VzbS9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgQWxlcnQgfSBmcm9tIFwiLi9BbGVydC9pbmRleC5qc1wiXG5leHBvcnQgeyBkZWZhdWx0IGFzIEJveCB9IGZyb20gXCIuL0JveC9pbmRleC5qc1wiXG5leHBvcnQgeyBkZWZhdWx0IGFzIEJ1dHRvbiB9IGZyb20gXCIuL0J1dHRvbi9pbmRleC5qc1wiXG5leHBvcnQgeyBkZWZhdWx0IGFzIENpcmN1bGFyUHJvZ3Jlc3MgfSBmcm9tIFwiLi9DaXJjdWxhclByb2dyZXNzL2luZGV4LmpzXCJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgQ29sbGFwc2UgfSBmcm9tIFwiLi9Db2xsYXBzZS9pbmRleC5qc1wiXG5leHBvcnQgeyBkZWZhdWx0IGFzIERpdmlkZXIgfSBmcm9tIFwiLi9EaXZpZGVyL2luZGV4LmpzXCJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgSWNvbkJ1dHRvbiB9IGZyb20gXCIuL0ljb25CdXR0b24vaW5kZXguanNcIlxuZXhwb3J0IHsgZGVmYXVsdCBhcyBMaXN0IH0gZnJvbSBcIi4vTGlzdC9pbmRleC5qc1wiXG5leHBvcnQgeyBkZWZhdWx0IGFzIExpc3RJdGVtIH0gZnJvbSBcIi4vTGlzdEl0ZW0vaW5kZXguanNcIlxuZXhwb3J0IHsgZGVmYXVsdCBhcyBMaXN0SXRlbVRleHQgfSBmcm9tIFwiLi9MaXN0SXRlbVRleHQvaW5kZXguanNcIlxuZXhwb3J0IHsgZGVmYXVsdCBhcyBQYXBlciB9IGZyb20gXCIuL1BhcGVyL2luZGV4LmpzXCJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgVHlwb2dyYXBoeSB9IGZyb20gXCIuL1R5cG9ncmFwaHkvaW5kZXguanNcIiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(pages-dir-node)/__barrel_optimize__?names=Alert,Box,Button,CircularProgress,Collapse,Divider,IconButton,List,ListItem,ListItemText,Paper,Typography!=!./node_modules/@mui/material/esm/index.js\n");

/***/ }),

/***/ "(pages-dir-node)/__barrel_optimize__?names=AppBar,Box,Button,IconButton,Menu,MenuItem,Toolbar,Typography,useMediaQuery,useTheme!=!./node_modules/@mui/material/esm/index.js":
/*!******************************************************************************************************************************************************************!*\
  !*** __barrel_optimize__?names=AppBar,Box,Button,IconButton,Menu,MenuItem,Toolbar,Typography,useMediaQuery,useTheme!=!./node_modules/@mui/material/esm/index.js ***!
  \******************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AppBar: () => (/* reexport safe */ _AppBar_index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]),\n/* harmony export */   Box: () => (/* reexport safe */ _Box_index_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]),\n/* harmony export */   Button: () => (/* reexport safe */ _Button_index_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]),\n/* harmony export */   IconButton: () => (/* reexport safe */ _IconButton_index_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"]),\n/* harmony export */   Menu: () => (/* reexport safe */ _Menu_index_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"]),\n/* harmony export */   MenuItem: () => (/* reexport safe */ _MenuItem_index_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"]),\n/* harmony export */   Toolbar: () => (/* reexport safe */ _Toolbar_index_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"]),\n/* harmony export */   Typography: () => (/* reexport safe */ _Typography_index_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"]),\n/* harmony export */   useMediaQuery: () => (/* reexport safe */ _useMediaQuery_index_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"]),\n/* harmony export */   useTheme: () => (/* reexport safe */ _home_runner_workspace_node_modules_mui_material_esm_styles_index_js__WEBPACK_IMPORTED_MODULE_9__.useTheme)\n/* harmony export */ });\n/* harmony import */ var _AppBar_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AppBar/index.js */ \"(pages-dir-node)/./node_modules/@mui/material/esm/AppBar/index.js\");\n/* harmony import */ var _Box_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Box/index.js */ \"(pages-dir-node)/./node_modules/@mui/material/esm/Box/index.js\");\n/* harmony import */ var _Button_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Button/index.js */ \"(pages-dir-node)/./node_modules/@mui/material/esm/Button/index.js\");\n/* harmony import */ var _IconButton_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./IconButton/index.js */ \"(pages-dir-node)/./node_modules/@mui/material/esm/IconButton/index.js\");\n/* harmony import */ var _Menu_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Menu/index.js */ \"(pages-dir-node)/./node_modules/@mui/material/esm/Menu/index.js\");\n/* harmony import */ var _MenuItem_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./MenuItem/index.js */ \"(pages-dir-node)/./node_modules/@mui/material/esm/MenuItem/index.js\");\n/* harmony import */ var _Toolbar_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Toolbar/index.js */ \"(pages-dir-node)/./node_modules/@mui/material/esm/Toolbar/index.js\");\n/* harmony import */ var _Typography_index_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Typography/index.js */ \"(pages-dir-node)/./node_modules/@mui/material/esm/Typography/index.js\");\n/* harmony import */ var _useMediaQuery_index_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./useMediaQuery/index.js */ \"(pages-dir-node)/./node_modules/@mui/material/esm/useMediaQuery/index.js\");\n/* harmony import */ var _home_runner_workspace_node_modules_mui_material_esm_styles_index_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./node_modules/@mui/material/esm/styles/index.js */ \"(pages-dir-node)/./node_modules/@mui/material/esm/styles/index.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_AppBar_index_js__WEBPACK_IMPORTED_MODULE_0__, _Box_index_js__WEBPACK_IMPORTED_MODULE_1__, _Button_index_js__WEBPACK_IMPORTED_MODULE_2__, _IconButton_index_js__WEBPACK_IMPORTED_MODULE_3__, _Menu_index_js__WEBPACK_IMPORTED_MODULE_4__, _MenuItem_index_js__WEBPACK_IMPORTED_MODULE_5__, _Toolbar_index_js__WEBPACK_IMPORTED_MODULE_6__, _Typography_index_js__WEBPACK_IMPORTED_MODULE_7__, _useMediaQuery_index_js__WEBPACK_IMPORTED_MODULE_8__, _home_runner_workspace_node_modules_mui_material_esm_styles_index_js__WEBPACK_IMPORTED_MODULE_9__]);\n([_AppBar_index_js__WEBPACK_IMPORTED_MODULE_0__, _Box_index_js__WEBPACK_IMPORTED_MODULE_1__, _Button_index_js__WEBPACK_IMPORTED_MODULE_2__, _IconButton_index_js__WEBPACK_IMPORTED_MODULE_3__, _Menu_index_js__WEBPACK_IMPORTED_MODULE_4__, _MenuItem_index_js__WEBPACK_IMPORTED_MODULE_5__, _Toolbar_index_js__WEBPACK_IMPORTED_MODULE_6__, _Typography_index_js__WEBPACK_IMPORTED_MODULE_7__, _useMediaQuery_index_js__WEBPACK_IMPORTED_MODULE_8__, _home_runner_workspace_node_modules_mui_material_esm_styles_index_js__WEBPACK_IMPORTED_MODULE_9__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\n\n\n\n\n\n\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS9fX2JhcnJlbF9vcHRpbWl6ZV9fP25hbWVzPUFwcEJhcixCb3gsQnV0dG9uLEljb25CdXR0b24sTWVudSxNZW51SXRlbSxUb29sYmFyLFR5cG9ncmFwaHksdXNlTWVkaWFRdWVyeSx1c2VUaGVtZSE9IS4vbm9kZV9tb2R1bGVzL0BtdWkvbWF0ZXJpYWwvZXNtL2luZGV4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNxRDtBQUNOO0FBQ007QUFDUTtBQUNaO0FBQ1E7QUFDRjtBQUNNO0FBQ00iLCJzb3VyY2VzIjpbIi9ob21lL3J1bm5lci93b3Jrc3BhY2Uvbm9kZV9tb2R1bGVzL0BtdWkvbWF0ZXJpYWwvZXNtL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlxuZXhwb3J0IHsgZGVmYXVsdCBhcyBBcHBCYXIgfSBmcm9tIFwiLi9BcHBCYXIvaW5kZXguanNcIlxuZXhwb3J0IHsgZGVmYXVsdCBhcyBCb3ggfSBmcm9tIFwiLi9Cb3gvaW5kZXguanNcIlxuZXhwb3J0IHsgZGVmYXVsdCBhcyBCdXR0b24gfSBmcm9tIFwiLi9CdXR0b24vaW5kZXguanNcIlxuZXhwb3J0IHsgZGVmYXVsdCBhcyBJY29uQnV0dG9uIH0gZnJvbSBcIi4vSWNvbkJ1dHRvbi9pbmRleC5qc1wiXG5leHBvcnQgeyBkZWZhdWx0IGFzIE1lbnUgfSBmcm9tIFwiLi9NZW51L2luZGV4LmpzXCJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgTWVudUl0ZW0gfSBmcm9tIFwiLi9NZW51SXRlbS9pbmRleC5qc1wiXG5leHBvcnQgeyBkZWZhdWx0IGFzIFRvb2xiYXIgfSBmcm9tIFwiLi9Ub29sYmFyL2luZGV4LmpzXCJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgVHlwb2dyYXBoeSB9IGZyb20gXCIuL1R5cG9ncmFwaHkvaW5kZXguanNcIlxuZXhwb3J0IHsgZGVmYXVsdCBhcyB1c2VNZWRpYVF1ZXJ5IH0gZnJvbSBcIi4vdXNlTWVkaWFRdWVyeS9pbmRleC5qc1wiXG5leHBvcnQgeyB1c2VUaGVtZSB9IGZyb20gXCIvaG9tZS9ydW5uZXIvd29ya3NwYWNlL25vZGVfbW9kdWxlcy9AbXVpL21hdGVyaWFsL2VzbS9zdHlsZXMvaW5kZXguanNcIiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(pages-dir-node)/__barrel_optimize__?names=AppBar,Box,Button,IconButton,Menu,MenuItem,Toolbar,Typography,useMediaQuery,useTheme!=!./node_modules/@mui/material/esm/index.js\n");

/***/ }),

/***/ "(pages-dir-node)/__barrel_optimize__?names=Box,Container!=!./node_modules/@mui/material/esm/index.js":
/*!*******************************************************************************************!*\
  !*** __barrel_optimize__?names=Box,Container!=!./node_modules/@mui/material/esm/index.js ***!
  \*******************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Box: () => (/* reexport safe */ _Box_index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]),\n/* harmony export */   Container: () => (/* reexport safe */ _Container_index_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])\n/* harmony export */ });\n/* harmony import */ var _Box_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Box/index.js */ \"(pages-dir-node)/./node_modules/@mui/material/esm/Box/index.js\");\n/* harmony import */ var _Container_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Container/index.js */ \"(pages-dir-node)/./node_modules/@mui/material/esm/Container/index.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_Box_index_js__WEBPACK_IMPORTED_MODULE_0__, _Container_index_js__WEBPACK_IMPORTED_MODULE_1__]);\n([_Box_index_js__WEBPACK_IMPORTED_MODULE_0__, _Container_index_js__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS9fX2JhcnJlbF9vcHRpbWl6ZV9fP25hbWVzPUJveCxDb250YWluZXIhPSEuL25vZGVfbW9kdWxlcy9AbXVpL21hdGVyaWFsL2VzbS9pbmRleC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUMrQyIsInNvdXJjZXMiOlsiL2hvbWUvcnVubmVyL3dvcmtzcGFjZS9ub2RlX21vZHVsZXMvQG11aS9tYXRlcmlhbC9lc20vaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiXG5leHBvcnQgeyBkZWZhdWx0IGFzIEJveCB9IGZyb20gXCIuL0JveC9pbmRleC5qc1wiXG5leHBvcnQgeyBkZWZhdWx0IGFzIENvbnRhaW5lciB9IGZyb20gXCIuL0NvbnRhaW5lci9pbmRleC5qc1wiIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(pages-dir-node)/__barrel_optimize__?names=Box,Container!=!./node_modules/@mui/material/esm/index.js\n");

/***/ }),

/***/ "@mui/system":
/*!******************************!*\
  !*** external "@mui/system" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/system");;

/***/ }),

/***/ "@mui/system/DefaultPropsProvider":
/*!***************************************************!*\
  !*** external "@mui/system/DefaultPropsProvider" ***!
  \***************************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/system/DefaultPropsProvider");;

/***/ }),

/***/ "@mui/system/InitColorSchemeScript":
/*!****************************************************!*\
  !*** external "@mui/system/InitColorSchemeScript" ***!
  \****************************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/system/InitColorSchemeScript");;

/***/ }),

/***/ "@mui/system/RtlProvider":
/*!******************************************!*\
  !*** external "@mui/system/RtlProvider" ***!
  \******************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/system/RtlProvider");;

/***/ }),

/***/ "@mui/system/colorManipulator":
/*!***********************************************!*\
  !*** external "@mui/system/colorManipulator" ***!
  \***********************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/system/colorManipulator");;

/***/ }),

/***/ "@mui/system/createBreakpoints":
/*!************************************************!*\
  !*** external "@mui/system/createBreakpoints" ***!
  \************************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/system/createBreakpoints");;

/***/ }),

/***/ "@mui/system/createStyled":
/*!*******************************************!*\
  !*** external "@mui/system/createStyled" ***!
  \*******************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/system/createStyled");;

/***/ }),

/***/ "@mui/system/createTheme":
/*!******************************************!*\
  !*** external "@mui/system/createTheme" ***!
  \******************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/system/createTheme");;

/***/ }),

/***/ "@mui/system/cssVars":
/*!**************************************!*\
  !*** external "@mui/system/cssVars" ***!
  \**************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/system/cssVars");;

/***/ }),

/***/ "@mui/system/spacing":
/*!**************************************!*\
  !*** external "@mui/system/spacing" ***!
  \**************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/system/spacing");;

/***/ }),

/***/ "@mui/system/styleFunctionSx":
/*!**********************************************!*\
  !*** external "@mui/system/styleFunctionSx" ***!
  \**********************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/system/styleFunctionSx");;

/***/ }),

/***/ "@mui/system/useMediaQuery":
/*!********************************************!*\
  !*** external "@mui/system/useMediaQuery" ***!
  \********************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/system/useMediaQuery");;

/***/ }),

/***/ "@mui/system/useThemeProps":
/*!********************************************!*\
  !*** external "@mui/system/useThemeProps" ***!
  \********************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/system/useThemeProps");;

/***/ }),

/***/ "@mui/utils":
/*!*****************************!*\
  !*** external "@mui/utils" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/utils");;

/***/ }),

/***/ "@mui/utils/HTMLElementType":
/*!*********************************************!*\
  !*** external "@mui/utils/HTMLElementType" ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/utils/HTMLElementType");;

/***/ }),

/***/ "@mui/utils/appendOwnerState":
/*!**********************************************!*\
  !*** external "@mui/utils/appendOwnerState" ***!
  \**********************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/utils/appendOwnerState");;

/***/ }),

/***/ "@mui/utils/capitalize":
/*!****************************************!*\
  !*** external "@mui/utils/capitalize" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/utils/capitalize");;

/***/ }),

/***/ "@mui/utils/chainPropTypes":
/*!********************************************!*\
  !*** external "@mui/utils/chainPropTypes" ***!
  \********************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/utils/chainPropTypes");;

/***/ }),

/***/ "@mui/utils/composeClasses":
/*!********************************************!*\
  !*** external "@mui/utils/composeClasses" ***!
  \********************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/utils/composeClasses");;

/***/ }),

/***/ "@mui/utils/createChainedFunction":
/*!***************************************************!*\
  !*** external "@mui/utils/createChainedFunction" ***!
  \***************************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/utils/createChainedFunction");;

/***/ }),

/***/ "@mui/utils/debounce":
/*!**************************************!*\
  !*** external "@mui/utils/debounce" ***!
  \**************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/utils/debounce");;

/***/ }),

/***/ "@mui/utils/deepmerge":
/*!***************************************!*\
  !*** external "@mui/utils/deepmerge" ***!
  \***************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/utils/deepmerge");;

/***/ }),

/***/ "@mui/utils/deprecatedPropType":
/*!************************************************!*\
  !*** external "@mui/utils/deprecatedPropType" ***!
  \************************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/utils/deprecatedPropType");;

/***/ }),

/***/ "@mui/utils/elementAcceptingRef":
/*!*************************************************!*\
  !*** external "@mui/utils/elementAcceptingRef" ***!
  \*************************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/utils/elementAcceptingRef");;

/***/ }),

/***/ "@mui/utils/elementTypeAcceptingRef":
/*!*****************************************************!*\
  !*** external "@mui/utils/elementTypeAcceptingRef" ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/utils/elementTypeAcceptingRef");;

/***/ }),

/***/ "@mui/utils/extractEventHandlers":
/*!**************************************************!*\
  !*** external "@mui/utils/extractEventHandlers" ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/utils/extractEventHandlers");;

/***/ }),

/***/ "@mui/utils/formatMuiErrorMessage":
/*!***************************************************!*\
  !*** external "@mui/utils/formatMuiErrorMessage" ***!
  \***************************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/utils/formatMuiErrorMessage");;

/***/ }),

/***/ "@mui/utils/generateUtilityClass":
/*!**************************************************!*\
  !*** external "@mui/utils/generateUtilityClass" ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/utils/generateUtilityClass");;

/***/ }),

/***/ "@mui/utils/generateUtilityClasses":
/*!****************************************************!*\
  !*** external "@mui/utils/generateUtilityClasses" ***!
  \****************************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/utils/generateUtilityClasses");;

/***/ }),

/***/ "@mui/utils/getReactElementRef":
/*!************************************************!*\
  !*** external "@mui/utils/getReactElementRef" ***!
  \************************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/utils/getReactElementRef");;

/***/ }),

/***/ "@mui/utils/getScrollbarSize":
/*!**********************************************!*\
  !*** external "@mui/utils/getScrollbarSize" ***!
  \**********************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/utils/getScrollbarSize");;

/***/ }),

/***/ "@mui/utils/integerPropType":
/*!*********************************************!*\
  !*** external "@mui/utils/integerPropType" ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/utils/integerPropType");;

/***/ }),

/***/ "@mui/utils/isFocusVisible":
/*!********************************************!*\
  !*** external "@mui/utils/isFocusVisible" ***!
  \********************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/utils/isFocusVisible");;

/***/ }),

/***/ "@mui/utils/isMuiElement":
/*!******************************************!*\
  !*** external "@mui/utils/isMuiElement" ***!
  \******************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/utils/isMuiElement");;

/***/ }),

/***/ "@mui/utils/mergeSlotProps":
/*!********************************************!*\
  !*** external "@mui/utils/mergeSlotProps" ***!
  \********************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/utils/mergeSlotProps");;

/***/ }),

/***/ "@mui/utils/ownerDocument":
/*!*******************************************!*\
  !*** external "@mui/utils/ownerDocument" ***!
  \*******************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/utils/ownerDocument");;

/***/ }),

/***/ "@mui/utils/ownerWindow":
/*!*****************************************!*\
  !*** external "@mui/utils/ownerWindow" ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/utils/ownerWindow");;

/***/ }),

/***/ "@mui/utils/refType":
/*!*************************************!*\
  !*** external "@mui/utils/refType" ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/utils/refType");;

/***/ }),

/***/ "@mui/utils/requirePropFactory":
/*!************************************************!*\
  !*** external "@mui/utils/requirePropFactory" ***!
  \************************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/utils/requirePropFactory");;

/***/ }),

/***/ "@mui/utils/resolveComponentProps":
/*!***************************************************!*\
  !*** external "@mui/utils/resolveComponentProps" ***!
  \***************************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/utils/resolveComponentProps");;

/***/ }),

/***/ "@mui/utils/resolveProps":
/*!******************************************!*\
  !*** external "@mui/utils/resolveProps" ***!
  \******************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/utils/resolveProps");;

/***/ }),

/***/ "@mui/utils/setRef":
/*!************************************!*\
  !*** external "@mui/utils/setRef" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/utils/setRef");;

/***/ }),

/***/ "@mui/utils/unsupportedProp":
/*!*********************************************!*\
  !*** external "@mui/utils/unsupportedProp" ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/utils/unsupportedProp");;

/***/ }),

/***/ "@mui/utils/useControlled":
/*!*******************************************!*\
  !*** external "@mui/utils/useControlled" ***!
  \*******************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/utils/useControlled");;

/***/ }),

/***/ "@mui/utils/useEnhancedEffect":
/*!***********************************************!*\
  !*** external "@mui/utils/useEnhancedEffect" ***!
  \***********************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/utils/useEnhancedEffect");;

/***/ }),

/***/ "@mui/utils/useEventCallback":
/*!**********************************************!*\
  !*** external "@mui/utils/useEventCallback" ***!
  \**********************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/utils/useEventCallback");;

/***/ }),

/***/ "@mui/utils/useForkRef":
/*!****************************************!*\
  !*** external "@mui/utils/useForkRef" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/utils/useForkRef");;

/***/ }),

/***/ "@mui/utils/useId":
/*!***********************************!*\
  !*** external "@mui/utils/useId" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/utils/useId");;

/***/ }),

/***/ "@mui/utils/useLazyRef":
/*!****************************************!*\
  !*** external "@mui/utils/useLazyRef" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/utils/useLazyRef");;

/***/ }),

/***/ "@mui/utils/useSlotProps":
/*!******************************************!*\
  !*** external "@mui/utils/useSlotProps" ***!
  \******************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/utils/useSlotProps");;

/***/ }),

/***/ "@mui/utils/useTimeout":
/*!****************************************!*\
  !*** external "@mui/utils/useTimeout" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@mui/utils/useTimeout");;

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = import("axios");;

/***/ }),

/***/ "clsx":
/*!***********************!*\
  !*** external "clsx" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = import("clsx");;

/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "prop-types":
/*!*****************************!*\
  !*** external "prop-types" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = require("prop-types");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-dom");

/***/ }),

/***/ "react-is":
/*!***************************!*\
  !*** external "react-is" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-is");

/***/ }),

/***/ "react-transition-group":
/*!*****************************************!*\
  !*** external "react-transition-group" ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-transition-group");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/@mui","vendor-chunks/next","vendor-chunks/@swc"], () => (__webpack_exec__("(pages-dir-node)/./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES&page=%2Fupload&preferredRegion=&absolutePagePath=.%2Fpages%2Fupload.js&absoluteAppPath=private-next-pages%2F_app&absoluteDocumentPath=private-next-pages%2F_document&middlewareConfigBase64=e30%3D!")));
module.exports = __webpack_exports__;

})();