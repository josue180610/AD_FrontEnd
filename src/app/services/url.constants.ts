//NO CAMBIAR. AMBIENTE PROD
const MAIN_URL_PROD = "https://rhdigitalbackprod.azurewebsites.net";
const MAIN_URL_MAILING_PROD = "https://rhdigitalbackprod.azurewebsites.net";
//NO CAMBIAR. AMBIENTE QAS
const MAIN_URL_QAS = "https://rhdigitalback-dev.azurewebsites.net";
const MAIN_URL_MAILING_QAS = "https://rhdigitalback-dev.azurewebsites.net";
//AMBIENTE LOCAL
const MAIN_URL_LOCAL = "http://192.168.43.180:8080";
const MAIN_URL_MAILING_LOCAL = "http://localhost:5000";
const MAIN_URL_LOCAL_PYTHON="http://localhost:5000";
//==============================================================================================
//GENERAL URL AQUI CAMBIAR

const MAIN_URL = MAIN_URL_LOCAL_PYTHON;

//SESSION
export const URL_POST_SESSION=MAIN_URL_LOCAL+"/login";

//INVOICE
export const URL_PROCESS_EXCEL=MAIN_URL_LOCAL+"/invoiceservice/v1/invoice/";

//==============================================================================================
//POR AHORA SIEMPRE ES IGUAL
const MAIN_URL_MAILING = MAIN_URL;
export const API_SESSION = MAIN_URL + "/session";
export const API_PUT_USER_DATA = MAIN_URL + "/updateUserData";
//RETIREMENT MODULE
export const API_RET_GET_CURRENT_PROCESS = MAIN_URL + "/ret_current_process";
export const API_RET_GET_PROCESS = MAIN_URL + "/ret_processes";
export const API_RET_FIND_EMPLOYEE = MAIN_URL + "/employees";
export const API_RET_SIMULATION = MAIN_URL + "/retirement";
export const API_RET_REGISTRATION = MAIN_URL + "/ret_registration";
export const API_RET_FIND_EMPLOYEE_RET = MAIN_URL + "/ret_employees";
export const API_RET_FIND_EMPLOYEE_RET_DET = MAIN_URL + "/ret_employee_det";
export const API_RET_UPL_DOC = MAIN_URL + "/ret_upload_document";
export const API_RET_DEL_DOC = MAIN_URL + "/ret_delete_document";
export const API_RET_FIND_MY_ENR_EMPLOYEES = MAIN_URL + "/ret_my_enr_employees";
export const API_PUT_RESET_PASSWORD = MAIN_URL + "/resetPwd";

// CORONAVIRUS
export const API_CORONA_SEARCHEMPLOYEES =
	MAIN_URL + "/coronavirus/searchemployees";
export const API_CORONA_REQUESTDETAIL = MAIN_URL + "/coronavirus/requestdetail";

//ELECTION
export const API_ELE_VOTE = MAIN_URL + "/ele_vote";
export const API_ELE_INIT_VOTE = MAIN_URL + "/ele_init_vote";
export const API_ELE_RESULTS = MAIN_URL + "/ele_results";

export const API_ELE2_ELECTOR = MAIN_URL + "/ele2_user";
export const API_ELE2_VOTE = MAIN_URL + "/ele2_vote";
export const API_ELE2_RESULTS = MAIN_URL + "/ele2_results";
//UTIL
export const API_TER_GET_TERMS_CONDITION=MAIN_URL+"/terms/showTermsCondition";
export const API_TER_GET_TERMS_USER=MAIN_URL+"/terms/userTermsCondition";
// TERCEROS
export const API_TER_POST_FINDMASSIVE_SUPPLIER=MAIN_URL+"/supServiceMassive";
export const API_TER_POST_ADDNEW_GESTOR_SERVICE=MAIN_URL+"/supService";
export const API_TER_POST_ADD_USERSERVICE = MAIN_URL + "/addUserService";
export const API_TER_GET_COMPANYSERVICE_DESCRIPTION =
	MAIN_URL + "/findCompanyServiceDescription";
export const API_TER_GET_COMPANYSERVICE_SUPP_GESTOR =
	MAIN_URL + "/findCompanyServiceSuppGestor";
export const API_TER_REPORT_MODULE=MAIN_URL+"/terceros/reportGeneralTer";
export const API_TER_GET_COMPANYSERVICE_DISABLED=MAIN_URL+"/showCompanyServiceDisabled";
export const API_TER_GET_COMPANY=MAIN_URL+"/company";
export const API_TER_GET_COMPANYSERVICE = MAIN_URL + "/findCompanyService";
export const API_TER_SUPPLIERS = MAIN_URL + "/suppliers";
export const API_TER_POST_SUPPLIERS_ADMIN = MAIN_URL + "/suppliersAdmin";
export const API_TER_SUPPLIER = MAIN_URL + "/supplier";
export const API_TER_SUPPLIER_DELETE = MAIN_URL + "/disabledsupplier";
export const API_TER_COMPANY_SERVICE__ = MAIN_URL + "/companyservice";
export const API_TER_COMPANY_SERVICES__ = MAIN_URL + "/companyservices/";
export const API_TER_SUPPLIER_UPDATESTATUS = MAIN_URL + "/supplierstatus";
export const API_TER_STARTERDATA = MAIN_URL + "/terceros/starterdata/";
export const API_TER_MNG_TDP_POST=MAIN_URL+"/findEmployeeData";
export const API_TER_SEDES = MAIN_URL + "/terceros/sedes/";
export const API_TER_GEN_ACCESS = MAIN_URL + "/terceros/access";
export const API_TER__ACCESS_VALIDATION__ =
	MAIN_URL + "/terceros/accessvalidation";
export const API_TER__ACCESS_REGISTER__ = MAIN_URL + "/terceros/accessregister";
export const API_TER__SYMPTOMS_REPORT__ = MAIN_URL + "/terceros/syptomsreport";
export const API_TER_POST_AGREE_EMPLOYEE =
	MAIN_URL + "/terceros/accessregisterEmployee";
export const API_TER_GET_VERIFY_EXIST = MAIN_URL + "/supplier";
//MULTIOPERADOR
export const API_GET_DISABLED_ACCESS =
	MAIN_URL + "/qallarix/removeAccessEmployee";

// DOCUMENTS
export const API_DOC_DOCUMENT = MAIN_URL + "/gendocument/";
export const API_DOC_DOCUMENTS = MAIN_URL + "/gendocuments";
export const API_DOC_DOCUMENT_DETAIL = MAIN_URL + "/gendocumentdetail/";
export const API_DOC_DOCUMENT_DETAILS = MAIN_URL + "/gendocumentdetails";
export const API_DOC_DOCUMENT_TEMPLATE = MAIN_URL + "/gendocumenttemplate/";
export const API_DOC_DOCUMENT_TEMPLATES = MAIN_URL + "/gendocumenttemplates";
export const API_DOCUMENT_GENERATION = MAIN_URL + "/gendoc";
export const API_DOCUMENT_PREVIEW = MAIN_URL + "/genprev";
// MAILING
export const API_SEND_MAIL = MAIN_URL_MAILING + "/sendmail";
export const API_MAIL_CHECK_STATUS = MAIN_URL_MAILING + "/current_status/";
export const API_GET_TEMPLATE = MAIN_URL_MAILING + "/template/";
export const API_TEMPLATES = MAIN_URL_MAILING + "/templates";

export const API_MAIL_SENTS = MAIN_URL_MAILING + "/sents";
export const API_MAIL_SENTDETAILS = MAIN_URL_MAILING + "/sent/";
export const API_SENTDETAILS_ATTACHMENT = MAIN_URL_MAILING + "/attachments/";

export const API_UPLOAD_FILE_BACKEND = MAIN_URL_MAILING + "/mailing_atach_file";
export const API_SESSION_ATTACHS = MAIN_URL_MAILING + "/session_attachments";
// Massive upload - list document typesY
export const API_DOCUMENT_TYPE_URL = MAIN_URL + "/tipos-documentos";
export const API_LOCAL_NAME_URL = MAIN_URL + "/locales";
export const API_YEAR_NAME_URL = MAIN_URL + "/local/anio";
export const API_FILE_UPLOAD_URL = MAIN_URL + "/documento/carga";
export const API_LIST_FILES_URL = MAIN_URL + "/documentos";
export const API_DOWNLOAD_LIST_FILES_url = MAIN_URL + "";

// Para las vacaciones negras

export const API_LIST_DARK_VACATION_FILES = MAIN_URL + "/locales/anios";
export const API_LIST_DARK_VACATION_MONTH_PER_LOCAL = MAIN_URL + "/local/meses";

// Para el procesamiento

export const API_PROCESS_ALL = MAIN_URL + "/consolidado/limpiado";
export const API_BOSH_LIMPIADO = MAIN_URL + "/bosh/limpiado";
export const API_HEADCOUNT_LIMPIADO = MAIN_URL + "/headcount/limpiado";
export const API_LICENCIA_LIMPIADO = MAIN_URL + "/licencia/limpiado";
export const API_BIOMETRICO_CONSOLIDADO = MAIN_URL + "/biometrico/consolidado";
export const API_BIOMETRICO_LIMPIADO = MAIN_URL + "/biometrico/limpiado";

export const API_PUERTAS_EXTRACCION = MAIN_URL + "/puertas/extraccion";
export const API_MARCACION_REPORTE = MAIN_URL + "/marcacion/reporte";
export const API_VACACIONES_NEGRAS_REPORTE =
	MAIN_URL + "/vacaciones/negras/reporte";
export const API_AREQUIPA_PUERTAS_REPORTE =
	MAIN_URL + "/arequipa/puertas/reporte";

// Para subir archivos al azure
export const API_UPLOAD_FILE_AZURE = MAIN_URL + "/upload_file";

//new apis recruitments
export const API_TYPE_USER = MAIN_URL + "/filter_save_candidate";
export const API_CANDIDATE_SAVE = MAIN_URL + "/filter_save_candidate";
export const API_CANDIDATE_ALL = MAIN_URL + "/filter_save_candidate";
export const API_CANDIDATE_FIND = MAIN_URL + "/filter_save_candidate";
export const API_CANDIDATE_FIND_BY_IDPOSITION =
	MAIN_URL + "/filter_save_candidate";
export const API_CANDIDATE_UPDATE = MAIN_URL + "/filter_update_candidate";
export const API_COUNTRY_ALL = MAIN_URL + "/filter_save_country";
export const API_CONTRACTINV_ALL = MAIN_URL + "/filter_contract_inv";
export const API_CONTRACT_ALL = MAIN_URL + "/filter_contract";
export const API_DISTRICT_ALL = MAIN_URL + "/district_select";
// family member
export const API_SAVE_FAMILY = MAIN_URL + "/family_members_crud";
export const API_UPDATE_FAMILY = MAIN_URL + "/family_members_crud";
export const API_DELETE_FAMILY = MAIN_URL + "/family_members_crud";
export const API_FIND_FAMILY = MAIN_URL + "/family_members_crud";
//Grade
export const API_GRADE_ALL = MAIN_URL + "/filter_grade";
//identity Document
export const API_DOCUMENT_ALL = MAIN_URL + "/document_filter_save";
export const API_DOCUMENT_FIND = MAIN_URL + "/document_filter_save";
export const API_DOCUMENT_SAVE = MAIN_URL + "/document_filter_save";
//location
export const API_LOCATION_ALL = MAIN_URL + "/location_filter_save";
//position
//position
export const API_SAVE_POSITION = MAIN_URL + "/position_filter_save";
export const API_UPDATE_STATUS_POSITION = MAIN_URL + "/position_filter_save";
export const API_FIND_POSITION_CANDIDATE = MAIN_URL + "/position_filter_save";
//:____________
export const API_UPDATED_POSITION_STATUS_FINAL =
	MAIN_URL + "/final_update_position_status";
export const API_POSITION_ALL = MAIN_URL + "/position_filter_save";
export const API_POSITION_FIND = MAIN_URL + "/position_filter_save";
export const API_DISABLED_POSITION2 = MAIN_URL + "/position_update_disableb";
export const API_UNDEFINED = MAIN_URL + "/position_update_disableb";
export const API_VIEW_RECRUITMENTS = MAIN_URL + "/view_recruitments";
export const API_UPDATE_POSITION = MAIN_URL + "/position_update_disableb";
export const API_ENABLED_POSITION = MAIN_URL + "/position_enabled";
export const API_GET_DATA_BY_EMAIL = MAIN_URL + "/getDataPositionByEmail";
//status civil
export const API_STATUS_SAVE = MAIN_URL + "/filter_save_statusCivil";
export const API_STATUS_ALL = MAIN_URL + "/filter_save_statusCivil";
export const API_STATUS_FIND = MAIN_URL + "/filter_save_statusCivil";
//role
export const API_GET_ID_ROLE = MAIN_URL + "/get_role_id";
// study array
export const API_SAVE_STUDY = MAIN_URL + "/crud_study";
export const API_DELETE_STUDY = MAIN_URL + "/crud_study";
export const API_FIND_STUDY = MAIN_URL + "/crud_study";
//message
export const API_MESSAGE_CANDIDATE = MAIN_URL + "/sendEmailCandidate";
export const API_JOBOFFER_CANDIDATE = MAIN_URL + "/files";
// level study
export const API_GET_LEVEl = MAIN_URL + "/filter_levelStudy";
//category
export const API_CATEGORY_ALL = MAIN_URL + "/category";
//relationship
export const API_RELATION_ALL = MAIN_URL + "/filter_save_relationship";
//afp
export const API_AFP_ALL = MAIN_URL + "/filter_save_afp";
//user
export const API_SAVE_USER = MAIN_URL + "/user_crud"; //permite la creacion de un usuario
export const API_USER_TYPE = MAIN_URL + "/user_crud"; //permite obtener el tipo de usuario
export const API_USER_CANCEL = MAIN_URL + "/user_crud"; //deshabilita a nivel logico el acceso de un usuario
export const API_USER_ENABLED = MAIN_URL + "/user_enabled_db"; //habilita a nivel logico el acceso de un usuario
//user role
export const API_SAVE_USER_ROLE = MAIN_URL + "/user_crud";
//filter null or undefined candidate
export const API_UNDEFINED_CANDIDATE = MAIN_URL + "/filter_update_candidate";
//gesnext
export const API_GESNEXT_ALTA = MAIN_URL + "/gesnext_alta";
export const API_UPDATE_STATUS_GESNEXT = MAIN_URL + "/gesnext_alta";
export const API_SAVE_CIP = MAIN_URL + "/gesnext_alta";
export const API_GESNEXT_MESSAGE = MAIN_URL + "/gesnext-message";
export const API_SUCCESS_GESNEXT = MAIN_URL + "/send_image";
//save document candidate
export const API_SAVE_DOCUMENT = MAIN_URL + "/save_documents";
export const API_DELETE_DOCUMENT = MAIN_URL + "/save_documents";
export const API_SAVE_DOCUMENT_CAND = MAIN_URL + "/save_documents_cand";
export const API_DELETE_DOCUMENT_CAND = MAIN_URL + "/save_documents_cand";
export const API_GETALL_DOC = MAIN_URL + "/save_documents_cand";
//create new cnadidate
export const API_SAVE_NEW_CANDIDATE = MAIN_URL + "/create_new_candidate";
export const API_CREATE_CANDIDATE_USER =
	MAIN_URL + "/create_new_candidate_and_user";
export const API_CANDIDATE_DATA = MAIN_URL + "/getCandidateDatabyIdPosition";
//create nuevo convenio
export const API_SAVE_AGREEMENTS = MAIN_URL + "/agreements";
export const API_GET_AGREEMENTS = MAIN_URL + "/agreements";
//file
export const API_UPLOAD_FILE_DIRECTORY = MAIN_URL + "/upload_file_directory";
export const API_DOWNLOAD_FILE_AZURE = MAIN_URL + "/download_file";

//text
export const API_DW_FILE = MAIN_URL + "/download_files_front";
//generate file zip
export const API_GENERATE_ZIP = MAIN_URL + "/generate_zip";
export const API_REMOVE_FILE = MAIN_URL + "/remove_file";
export const API_LIST_DW_DOC = MAIN_URL + "/list_download_doc";
//select count distinct
export const API_SELECT_ROW = MAIN_URL + "/select_row";

//select count
export const API_AGE_GRAPHICT = MAIN_URL + "/query_graphic_age";
export const API_SEX_GRAPHICT = MAIN_URL + "/query_graphic_male";
export const API_STATUS_GRAPHICT = MAIN_URL + "/query_graphic_status";
export const API_VP_GRAPHICT = MAIN_URL + "/query_graphic_vp";
export const API_CATEGORY_GRAPHICT = MAIN_URL + "/query_graphic_category_pt";
export const API_DATE_PRESENT = MAIN_URL + "/query_date_present";
export const API_COUNT_GENERAL = MAIN_URL + "/query_graphic_general";
export const API_COUNT_GENERAL_NOT_PT =
	MAIN_URL + "/query_graphic_category_not_pt";

//export excel
export const API_EXPORT_EXCEL = MAIN_URL + "/report_excel_service";
export const API_EXPORT_EXCEL_AGREEMENTS =
	MAIN_URL + "/report_excel_agreements";
//create directoy
export const API_CREATE_DIR = MAIN_URL + "/create_dir";

// SALARY REVIEW
export const API_SR_GET_MY_EMPLOYEES = MAIN_URL + "/sr_get_my_employees"; //
export const API_SR_SAVE_INCREMENTS = MAIN_URL + "/sr_save_increments"; //POST
export const API_SR_CLOSE_REVIEW = MAIN_URL + "/sr_close_review";
export const API_SR_GET_REVIEWER = MAIN_URL + "/sr_get_reviewers";
export const API_SR_OPEN_REVIEW = MAIN_URL + "/sr_open_review";
export const API_SR_SAVE_PROCESS_STATE = MAIN_URL + "/sr_save_process_status";
export const API_SR_GET_ALL_PROCESS = MAIN_URL + "/get_all_process";

// CORONAVIRUS
export const API_GET_CORONAVIRUS_STATUS = MAIN_URL + "/getAllCoronavirusStatus"; //deprecado, no borrar igual se usan
export const API_GET_CORONAVIRUS_REASON = MAIN_URL + "/getAllCoronavirusReason"; //deprecado, no borrar igual se usan
export const API_POST_CORONAVIRUS_REQUEST =
	MAIN_URL + "/register_corona_request"; //deprecado, no borrar igual se usan
export const API_POST_CORONAVIRUS_CBO = MAIN_URL + "/loadDataCboCoronaVirus";
export const API_GET_CORONAVIRUS_GROUP_DETAIL =
	MAIN_URL + "/showDataGroupAndDetailCondition";
export const API_GET_CORONAVIRUS_EDIT_FORM =
	MAIN_URL + "/searchByEmployeeEditForm";
export const API_GET_COUNT_REASON = MAIN_URL + "/showCountReasonForDate"; //DEPRECADO
export const API_GET_FIND_BY_STATUS = MAIN_URL + "/searchByStatusEmployee";
export const API_GET_CORONAVIRUS_TYPE = MAIN_URL + "/getAllCoronaType";
export const API_GET_CORONAVIRUS_PRECONDITION_EDIT =
	MAIN_URL + "/searchByIdEmployeeCoronaRequest";
export const API_GET_CORONAVIRUS_PRECONDITION =
	MAIN_URL + "/getAllCoronaPrecondition";
export const API_GET_SECTION = MAIN_URL_MAILING + "/section/"; // DEPRECADO
export const API_SECTIONS = MAIN_URL_MAILING + "/sections"; // DEPRECADO
export const API_GENERAL_REPORT = MAIN_URL + "/report/generalReportCoronavirus";
export const API_ASSIST_REPORT = MAIN_URL + "/report/assistReportCoronavirus";
export const API_CRONICA_REPORT = MAIN_URL + "/report/cronicaReportCoronavirus";
export const API_REQUEST_DETAILS_REPORT =
	MAIN_URL + "/report/cronicaDetailsReportCoronavirus";
export const API_SAVE_MASSIVE_DATA = MAIN_URL + "/saveMassiveFromExcel";
export const API_SAVE_MASSIVE_DATA_REQUEST =
	MAIN_URL + "/saveMassiveCoronaRequestFromExcel";
export const API_GET_CORONAVIRUS_ASSIST =
	MAIN_URL + "/showDataAssistManagementTDP";
export const API_POST_CORONAVIRUS_ASSIT_DATE =
	MAIN_URL + "/showDataAssistManagementTDPByDate";
export const API_DELETE_CORONA_DOCUMENT = MAIN_URL + "/removeCoronaDocument";
export const API_SAVE_CORONA_DOCUMENT = MAIN_URL + "/saveCoronaDocument";
export const API_SHOW_TEAMS = MAIN_URL + "/employees_team";
export const API_DELETE_REMOVE_ASSIST = MAIN_URL + "/removeCoronaChecking";
export const API_DOWNLOAD_FILEAZURE_ZIP =
	MAIN_URL + "/downloadZipDocumentService";
export const API_GET_DATAFAMILYRELATIONSHIP =
	MAIN_URL + "/getAllDataFamilyByIdRequest";
export const API_DELETE_REMOVEFAMILY = MAIN_URL + "/removeRequestFamily";
export const API_DELETE_REMOVEALLFAMILY = MAIN_URL + "/deteleAllByRequest";
/* export const API_POST_VALIDATE_TOKEN="https://accesscontrolqa.azurewebsites.net/accesscontrol/validate";
 */
export const API_POST_VALIDATE_TOKEN =
	MAIN_URL + "/callStoreProcedureValidateToken";

export const API_POST_SAVE_BY_QR = MAIN_URL + "/saveCheckingByQr";

