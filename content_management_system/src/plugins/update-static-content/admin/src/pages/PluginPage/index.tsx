import React, { useState } from "react";
import { pluginPermissions } from "../../permissions";
import {
  Link,
  Typography,
  TextButton,
  Button,
  Table,
  Thead,
  Tbody,
  VisuallyHidden,
  Tr,
  Th,
} from "@strapi/design-system";
import { Page } from "@strapi/strapi/admin";
import { ArrowLeft, Plus, ArrowClockwise } from "@strapi/icons";
import { pluginId } from "../../pluginId";
import useFormattedLabel from "../../hooks/useFormattedLabel";
import Guard from "../../components/Guard";
import PageWrapper from "../../components/PageWrapper";
import useFetchData from "../../hooks/useFetchData";
import CustomRow from "../../components/CustomRow";
import axios from "../../utils/axiosInstance";
import ToastMsg from "../../components/ToastMsg";

const THEAD_ITEMS = [
  "Run Number",
  "Workflow Name",
  "Status",
  "Creation Date",
  "Duration",
  <VisuallyHidden key="actions" />,
];

const ProtectedPage = () => (
  // <Page.Protect permissions={pluginPermissions.trigger}>
  <PluginPage />
  // </Page.Protect>
);

const PluginPage = () => {
  // Hooks
  const [loadingTriggerButton, setLoadingTriggerButton] = useState(false);
  const [toastMsg, setToastMsg] = useState<{
    variant: string;
    title: string;
    message: string;
    action?: any;
  }>({
    variant: "",
    title: "",
    message: "",
  });
  const [toastToggle, setToastToggle] = useState(false);

  const { errors, fetchedData, isLoading, setRefetch } = useFetchData({
    url: `/${pluginId}/github-actions-history`,
    method: "GET",
  });

  // Translations
  const TITLE = useFormattedLabel("plugin.title");
  const HEADER_TITLE = useFormattedLabel("plugin.headers.title");
  const HEADER_SUBTITLE = useFormattedLabel("plugin.headers.subtitle");
  const PRIMARY_ACTION_BUTTON = useFormattedLabel("plugin.buttons.primary");
  const TOAST_SUCCESS_TITLE = useFormattedLabel("plugin.toast.success.title");
  const TOAST_SUCCESS_DESCRIPTION = useFormattedLabel(
    "plugin.toast.success.description",
  );
  const TOAST_FAILURE_UNKNOWN_TITLE = useFormattedLabel(
    "plugin.toast.failure.unknown.title",
  );
  const TOAST_FAILURE_UNKNOWN_DESCRIPTION = useFormattedLabel(
    "plugin.toast.failure.unknown.description",
  );
  const TOAST_FAILURE_UNPROCESSABLE_TITLE = useFormattedLabel(
    "plugin.toast.failure.unprocessableEntity.title",
  );
  const TOAST_FAILURE_UNPROCESSABLE_DESCRIPTION = useFormattedLabel(
    "plugin.toast.failure.unprocessableEntity.description",
  );
  const TOAST_PERMISSION_DENIED_MSG = useFormattedLabel(
    "permission.toast.message",
  );
  const TOAST_PERMISSION_DENIED_TITLE = useFormattedLabel(
    "permission.toast.title",
  );
  const SEE_MORE_BUTTON = useFormattedLabel("button.seeMore");
  const REFRESH_BUTTON = useFormattedLabel("button.refresh");
  const BACK_BUTTON = useFormattedLabel("button.back");

  // Callbacks
  async function triggerGithubActions() {
    try {
      setLoadingTriggerButton(true);
      await axios(`/${pluginId}/github-actions-trigger`, {
        method: "POST",
      });
      setToastMsg({
        variant: "success",
        title: TOAST_SUCCESS_TITLE,
        message: TOAST_SUCCESS_DESCRIPTION,
        action: (
          <TextButton
            endIcon={<ArrowClockwise />}
            onClick={() => {
              setRefetch({});
              setToastToggle(false);
            }}
          >
            {REFRESH_BUTTON}
          </TextButton>
        ),
      });
      setToastToggle(true);
    } catch (error) {
      console.error(error);
      if (
        (error as any).response.data.error?.status === 422 &&
        (error as any).response.data.error?.name === "UnprocessableEntityError"
      ) {
        setToastMsg({
          variant: "danger",
          title: TOAST_FAILURE_UNPROCESSABLE_TITLE,
          message: TOAST_FAILURE_UNPROCESSABLE_DESCRIPTION,
          action: (
            <Link
              isExternal
              href="https://docs.github.com/en/actions/managing-workflow-runs/disabling-and-enabling-a-workflow"
            >
              {SEE_MORE_BUTTON}
            </Link>
          ),
        });
      } else if (
        (error as any).response.data.error?.status === 403 &&
        (error as any).response.data.error?.name === "PolicyError"
      ) {
        setToastMsg({
          variant: "danger",
          title: TOAST_PERMISSION_DENIED_TITLE,
          message: TOAST_PERMISSION_DENIED_MSG,
        });
      } else {
        setToastMsg({
          variant: "danger",
          title: TOAST_FAILURE_UNKNOWN_TITLE,
          message: TOAST_FAILURE_UNKNOWN_DESCRIPTION,
        });
      }
      setToastToggle(true);
    } finally {
      setLoadingTriggerButton(false);
    }
  }

  const isAccessDenied =
    errors.message === "ACCESS_DENIED" &&
    errors.type === "ROLES_AND_PERMISSIONS";
  return (
    <>
      <PageWrapper
        isLoading={isLoading}
        baseHeaderLayout={
          <div style={{ padding: "24px 56px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <Typography variant="alpha" fontWeight="bold">
                  {HEADER_TITLE}
                </Typography>
                <Typography variant="epsilon" textColor="neutral600">
                  {HEADER_SUBTITLE}
                </Typography>
              </div>
              <Button
                onClick={triggerGithubActions}
                variant="default"
                size="L"
                disabled={isAccessDenied}
                loading={loadingTriggerButton}
                startIcon={<Plus />}
              >
                {PRIMARY_ACTION_BUTTON}
              </Button>
            </div>
          </div>
        }
        pageTitle={TITLE}
      >
        {toastToggle && (
          <ToastMsg
            variant={toastMsg.variant}
            title={toastMsg.title}
            message={toastMsg.message}
            action={toastMsg.action}
            closeToastHandler={() => setToastToggle(false)}
          />
        )}
        <Guard errors={errors}>
          <Table colCount={6} rowCount={21}>
            <Thead>
              <Tr>
                {THEAD_ITEMS.map((title, i) => (
                  <Th key={i}>
                    <Typography variant="sigma">{title}</Typography>
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {fetchedData?.workflow_runs?.map(
                ({
                  id,
                  conclusion,
                  name,
                  run_number,
                  run_started_at,
                  html_url,
                  updated_at,
                  disabled,
                  created_at,
                }: {
                  id: number;
                  conclusion: string;
                  name: string;
                  run_number: number;
                  run_started_at: string;
                  html_url: string;
                  updated_at: string;
                  disabled: boolean;
                  created_at: string;
                }) => {
                  return (
                    <CustomRow
                      key={id}
                      id={id}
                      conclusion={conclusion}
                      name={name}
                      run_number={run_number}
                      run_started_at={run_started_at}
                      html_url={html_url}
                      updated_at={updated_at}
                      created_at={created_at}
                    />
                  );
                },
              )}
            </Tbody>
          </Table>
        </Guard>
      </PageWrapper>
    </>
  );
};

export default ProtectedPage;
