import { useState, useEffect, useRef, useMemo } from "react";
import EmojiPicker, { Theme as EmojiTheme } from "emoji-picker-react";
import styles from "./settings.module.scss";
import ResetIcon from "../icons/reload.svg";
import CloseIcon from "../icons/close.svg";
import ClearIcon from "../icons/clear.svg";
import EditIcon from "../icons/edit.svg";
import { List, ListItem, Popover, showToast } from "./ui-lib";
import { IconButton } from "./button";
import {
  SubmitKey,
  useChatStore,
  Theme,
  ImageSize,
  ALL_MODELS,
  useUpdateStore,
  useAccessStore,
} from "../store";
import { Avatar, PromptHints } from "./home";
import Locale, { AllLangs, changeLang, getLang } from "../locales";
import { getCurrentVersion } from "../utils";
import Link from "next/link";
import { UPDATE_URL } from "../constant";
import { SearchService, usePromptStore } from "../store/prompt";
import { requestUsage } from "../requests";

function SettingItem(props: {
  title: string;
  subTitle?: string;
  children: JSX.Element;
}) {
  return (
    <ListItem>
      <div className={styles["settings-title"]}>
        <div>{props.title}</div>
        {props.subTitle && (
          <div className={styles["settings-sub-title"]}>{props.subTitle}</div>
        )}
      </div>
      {props.children}
    </ListItem>
  );
}

export function Settings(props: { closeSettings: () => void }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [config, updateConfig, resetConfig, clearAllData] = useChatStore(
    (state) => [
      state.config,
      state.updateConfig,
      state.resetConfig,
      state.clearAllData,
    ]
  );

  const updateStore = useUpdateStore();
  const [checkingUpdate, setCheckingUpdate] = useState(false);
  const currentId = getCurrentVersion();
  const remoteId = updateStore.remoteId;
  const hasNewVersion = currentId !== remoteId;

  function checkUpdate(force = false) {
    setCheckingUpdate(true);
    updateStore.getLatestCommitId(force).then(() => {
      setCheckingUpdate(false);
    });
  }

  const [usage, setUsage] = useState<{
    granted?: number;
    used?: number;
  }>();
  const [loadingUsage, setLoadingUsage] = useState(false);
  function checkUsage() {
    setLoadingUsage(true);
    requestUsage()
      .then((res) =>
        setUsage({
          granted: res?.total_granted,
          used: res?.total_used,
        })
      )
      .finally(() => {
        setLoadingUsage(false);
      });
  }

  useEffect(() => {
    checkUpdate();
    checkUsage();
  }, []);

  const accessStore = useAccessStore();
  const enabledAccessControl = useMemo(
    () => accessStore.enabledAccessControl(),
    []
  );

  const promptStore = usePromptStore();
  const builtinCount = SearchService.count.builtin;
  const customCount = promptStore.prompts.size ?? 0;

  return (
    <>
      <div className={styles["window-header"]}>
        <div className={styles["window-header-title"]}>
          <div className={styles["window-header-main-title"]}>
            {Locale.Settings.Title}
          </div>
          <div className={styles["window-header-sub-title"]}>
            {Locale.Settings.SubTitle}
          </div>
        </div>
        <div className={styles["window-actions"]}>
          <div className={styles["window-action-button"]}>
            <IconButton
              icon={<ClearIcon />}
              onClick={clearAllData}
              bordered
              title={Locale.Settings.Actions.ClearAll}
            />
          </div>
          <div className={styles["window-action-button"]}>
            <IconButton
              icon={<ResetIcon />}
              onClick={resetConfig}
              bordered
              title={Locale.Settings.Actions.ResetAll}
            />
          </div>
          <div className={styles["window-action-button"]}>
            <IconButton
              icon={<CloseIcon />}
              onClick={props.closeSettings}
              bordered
              title={Locale.Settings.Actions.Close}
            />
          </div>
        </div>
      </div>
      <div className={styles["settings"]}>
        <List>
          <SettingItem title={Locale.Settings.Avatar}>
            <Popover
              onClose={() => setShowEmojiPicker(false)}
              content={
                <EmojiPicker
                  lazyLoadEmojis
                  theme={EmojiTheme.AUTO}
                  onEmojiClick={(e) => {
                    updateConfig((config) => (config.avatar = e.unified));
                    setShowEmojiPicker(false);
                  }}
                />
              }
              open={showEmojiPicker}>
              <div
                className={styles.avatar}
                onClick={() => setShowEmojiPicker(true)}>
                <Avatar role="user" />
              </div>
            </Popover>
          </SettingItem>

          <SettingItem
            title={Locale.Settings.Update.Version(currentId)}
            subTitle={
              checkingUpdate
                ? Locale.Settings.Update.IsChecking
                : hasNewVersion
                ? Locale.Settings.Update.FoundUpdate(remoteId ?? "ERROR")
                : Locale.Settings.Update.IsLatest
            }>
            {checkingUpdate ? (
              <div />
            ) : hasNewVersion ? (
              <Link href={UPDATE_URL} target="_blank" className="link">
                {Locale.Settings.Update.GoToUpdate}
              </Link>
            ) : (
              <IconButton
                icon={<ResetIcon></ResetIcon>}
                text={Locale.Settings.Update.CheckUpdate}
                onClick={() => checkUpdate(true)}
              />
            )}
          </SettingItem>

          <SettingItem title={Locale.Settings.SendKey}>
            <select
              value={config.submitKey}
              onChange={(e) => {
                updateConfig(
                  (config) =>
                    (config.submitKey = e.target.value as any as SubmitKey)
                );
              }}>
              {Object.values(SubmitKey).map((v) => (
                <option value={v} key={v}>
                  {v}
                </option>
              ))}
            </select>
          </SettingItem>

          <ListItem>
            <div className={styles["settings-title"]}>
              {Locale.Settings.Theme}
            </div>
            <select
              value={config.theme}
              onChange={(e) => {
                updateConfig(
                  (config) => (config.theme = e.target.value as any as Theme)
                );
              }}>
              {Object.values(Theme).map((v) => (
                <option value={v} key={v}>
                  {v}
                </option>
              ))}
            </select>
          </ListItem>

          <SettingItem title={Locale.Settings.Lang.Name}>
            <select
              value={getLang()}
              onChange={(e) => {
                changeLang(e.target.value as any);
              }}>
              {AllLangs.map((lang) => (
                <option value={lang} key={lang}>
                  {Locale.Settings.Lang.Options[lang]}
                </option>
              ))}
            </select>
          </SettingItem>

          <SettingItem
            title={Locale.Settings.FontSize.Title}
            subTitle={Locale.Settings.FontSize.SubTitle}>
            <input
              type="range"
              title={`${config.fontSize ?? 14}px`}
              value={config.fontSize}
              min="12"
              max="18"
              step="1"
              onChange={(e) =>
                updateConfig(
                  (config) =>
                    (config.fontSize = Number.parseInt(e.currentTarget.value))
                )
              }></input>
          </SettingItem>

          <SettingItem title={Locale.Settings.TightBorder}>
            <input
              type="checkbox"
              checked={config.tightBorder}
              onChange={(e) =>
                updateConfig(
                  (config) => (config.tightBorder = e.currentTarget.checked)
                )
              }></input>
          </SettingItem>
        </List>
        <List>
          <SettingItem
            title={Locale.Settings.Prompt.Disable.Title}
            subTitle={Locale.Settings.Prompt.Disable.SubTitle}>
            <input
              type="checkbox"
              checked={config.disablePromptHint}
              onChange={(e) =>
                updateConfig(
                  (config) =>
                    (config.disablePromptHint = e.currentTarget.checked)
                )
              }></input>
          </SettingItem>

          <SettingItem
            title={Locale.Settings.Prompt.List}
            subTitle={Locale.Settings.Prompt.ListCount(
              builtinCount,
              customCount
            )}>
            <IconButton
              icon={<EditIcon />}
              text={Locale.Settings.Prompt.Edit}
              onClick={() => showToast(Locale.WIP)}
            />
          </SettingItem>
        </List>
        <List>
          {enabledAccessControl ? (
            <SettingItem
              title={Locale.Settings.AccessCode.Title}
              subTitle={Locale.Settings.AccessCode.SubTitle}>
              <input
                value={accessStore.accessCode}
                type="password"
                placeholder={Locale.Settings.AccessCode.Placeholder}
                onChange={(e) => {
                  accessStore.updateCode(e.currentTarget.value);
                }}></input>
            </SettingItem>
          ) : (
            <></>
          )}

          <SettingItem
            title={Locale.Settings.Token.Title}
            subTitle={Locale.Settings.Token.SubTitle}>
            <input
              value={accessStore.token}
              type="password"
              placeholder={Locale.Settings.Token.Placeholder}
              onChange={(e) => {
                accessStore.updateToken(e.currentTarget.value);
              }}></input>
          </SettingItem>

          <SettingItem
            title={Locale.Settings.Usage.Title}
            subTitle={
              loadingUsage
                ? Locale.Settings.Usage.IsChecking
                : Locale.Settings.Usage.SubTitle(
                    usage?.granted ?? "0.00",
                    usage?.used ?? "0.00"
                  )
            }>
            {loadingUsage ? (
              <div />
            ) : (
              <IconButton
                icon={<ResetIcon></ResetIcon>}
                text={Locale.Settings.Usage.Check}
                onClick={checkUsage}
              />
            )}
          </SettingItem>

          <SettingItem
            title={Locale.Settings.HistoryCount.Title}
            subTitle={Locale.Settings.HistoryCount.SubTitle}>
            <input
              type="range"
              title={config.historyMessageCount.toString()}
              value={config.historyMessageCount}
              min="0"
              max="25"
              step="2"
              onChange={(e) =>
                updateConfig(
                  (config) =>
                    (config.historyMessageCount = e.target.valueAsNumber)
                )
              }></input>
          </SettingItem>

          <SettingItem
            title={Locale.Settings.CompressThreshold.Title}
            subTitle={Locale.Settings.CompressThreshold.SubTitle}>
            <input
              type="number"
              min={500}
              max={4000}
              value={config.compressMessageLengthThreshold}
              onChange={(e) =>
                updateConfig(
                  (config) =>
                    (config.compressMessageLengthThreshold =
                      e.currentTarget.valueAsNumber)
                )
              }></input>
          </SettingItem>
        </List>

        <List>
          <SettingItem title={Locale.Settings.Model}>
            <select
              value={config.modelConfig.model}
              onChange={(e) => {
                updateConfig(
                  (config) => (config.modelConfig.model = e.currentTarget.value)
                );
              }}>
              {ALL_MODELS.map((v) => (
                <option value={v.name} key={v.name} disabled={!v.available}>
                  {v.name}
                </option>
              ))}
            </select>
          </SettingItem>
          <SettingItem
            title={Locale.Settings.Temperature.Title}
            subTitle={Locale.Settings.Temperature.SubTitle}>
            <input
              type="range"
              value={config.modelConfig.temperature.toFixed(1)}
              min="0"
              max="2"
              step="0.1"
              onChange={(e) => {
                updateConfig(
                  (config) =>
                    (config.modelConfig.temperature =
                      e.currentTarget.valueAsNumber)
                );
              }}></input>
          </SettingItem>
          <SettingItem
            title={Locale.Settings.MaxTokens.Title}
            subTitle={Locale.Settings.MaxTokens.SubTitle}>
            <input
              type="number"
              min={100}
              max={4096}
              value={config.modelConfig.max_tokens}
              onChange={(e) =>
                updateConfig(
                  (config) =>
                    (config.modelConfig.max_tokens =
                      e.currentTarget.valueAsNumber)
                )
              }></input>
          </SettingItem>
          <SettingItem
            title={Locale.Settings.PresencePenlty.Title}
            subTitle={Locale.Settings.PresencePenlty.SubTitle}>
            <input
              type="range"
              value={config.modelConfig.presence_penalty.toFixed(1)}
              min="-2"
              max="2"
              step="0.5"
              onChange={(e) => {
                updateConfig(
                  (config) =>
                    (config.modelConfig.presence_penalty =
                      e.currentTarget.valueAsNumber)
                );
              }}></input>
          </SettingItem>
        </List>

        <List>
          <div style={{ padding: "0 20px" }}>
            <h4 style={{ margin: "10px 0 0" }}>{Locale.Settings.Image}</h4>
            <span style={{ fontSize: "12px" }}>
              {Locale.Settings.ImageDesc}
            </span>
          </div>

          <ListItem>
            <div className={styles["settings-title"]}>
              {Locale.Settings.ImageSize.Name}
            </div>
            <select
              value={config.imageModelConfig.size || "256x256"}
              onChange={(e) => {
                updateConfig(
                  (config) =>
                    (config.imageModelConfig.size = e.target
                      .value as any as ImageSize)
                );
              }}>
              {Object.values(ImageSize).map((v) => (
                <option value={v} key={v}>
                  {v}
                </option>
              ))}
            </select>
          </ListItem>
        </List>

        <List>
          <div style={{ padding: "10px 20px" }}>
            <h4>免责声明</h4>
            <p style={{ fontSize: "14px" }}>
              1.本网站是使用 OpenAI API的 ChatGPT
              镜像网站，仅供娱乐和学习目的，不得用于任何商业用途。
              <br />
              2.本网站所提供的信息和内容仅代表用户个人观点，不代表OpenAI或任何其他组织的观点。
              <br />
              3.本网站所提供的信息和内容可能存在不准确、不完整、过时或错误的情况，用户在使用时需自行判断其可靠性并承担相应风险。
              <br />
              4.用户在使用本网站时，应遵守所有适用的法律法规和用户协议，不得利用本网站进行任何违法或有害行为。
              <br />
              5.本网站不对用户因使用本网站而产生的任何直接或间接损失负责，包括但不限于经济损失、数据丢失、计算机系统损坏等。
              <br />
              6.本免责声明适用于本网站的所有用户，使用本网站即视为用户已同意本免责声明的所有内容。本网站有权随时修改本免责声明的内容，修改后的免责声明将在本网站上公布并立即生效。
              <br />
            </p>
          </div>
          <div></div>
        </List>
      </div>
    </>
  );
}
