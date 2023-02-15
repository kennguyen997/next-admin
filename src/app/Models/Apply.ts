import * as yup from 'yup';
import i18n from 'app/trans/i18n';
export interface ApplyType {
  apply_company_name: string;
  apply_project_name: string;
  apply_type_video: string;
  apply_project_content: string;
  apply_email: string;
  apply_phone: string;
  apply_budget: string;
  apply_how_long: string;
  apply_link: string;
  apply_expect_benefit_1: boolean;
  apply_expect_benefit_2: boolean;
  apply_expect_benefit_3: boolean;
  apply_expect_benefit_4: boolean;
  apply_extra_information: string;
}

export const ApplyYup = yup.object().shape({
  apply_company_name: yup.string().required(),
  apply_project_name: yup.string().required(),
  apply_type_video: yup.string().required(),
  apply_project_content: yup.string().required(),
  apply_email: yup.string().email().required(),
  apply_phone: i18n.language == 'korean' ? yup.string().required() : yup.string(),
  apply_budget: yup.number().required(),
  apply_link: yup.string().required(),
  apply_expect_benefit_1: yup.boolean(),
  apply_expect_benefit_2: yup.boolean(),
  apply_expect_benefit_3: yup.boolean(),
  apply_expect_benefit_4: yup.boolean(),
});
