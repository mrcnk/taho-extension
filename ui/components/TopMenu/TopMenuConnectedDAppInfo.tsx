import React, { ReactElement } from "react"
import { useTranslation } from "react-i18next"
import SharedAccordion from "../Shared/SharedAccordion"
import { WalletDefaultToggle } from "../Wallet/WalletToggleDefaultBanner"

function ConnectionDAppGuideline({
  isConnected,
}: {
  isConnected: boolean
}): ReactElement {
  const { t } = useTranslation("translation", {
    keyPrefix: "topMenu.connectedDappInfo.guideline",
  })
  const { t: tShared } = useTranslation("translation", { keyPrefix: "shared" })

  return (
    <>
      <SharedAccordion
        contentHeight={231}
        style={{
          width: 288,
          padding: 16,
          borderRadius: 8,
          marginTop: 8,
          background: "var(--green-120)",
        }}
        isInitiallyOpen={!isConnected}
        headerElement={<span className="title">{t("title")}</span>}
        contentElement={
          <div className="content_wrap">
            <ol className="steps">
              <li>
                <span className="wallet_toggle_wrap">
                  {t("step1")}
                  <WalletDefaultToggle />
                </span>
              </li>
              <li>{t("step2")}</li>
              <li>{t("step3")}</li>
            </ol>
            <div className="list_wrap">
              <span className="item">
                <img src="./images/tally_token.svg" alt="Tally token" />
                {tShared("tallyHo")}
              </span>
              <span className="item">
                <img src="./images/icons/s/arrow-right.svg" alt="Arrow right" />
                {tShared("injected")}
              </span>
              <span className="item">
                <span className="fox">🦊</span> {tShared("metaMask")}
              </span>
            </div>
          </div>
        }
      />
      <style jsx>{`
        .title {
          font-weight: 600;
          font-size: 18px;
          line-height: 24px;
        }
        .content_wrap {
          height: 85%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .wallet_toggle_wrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }
        .steps {
          margin: 0;
          padding: 0;
          display: flex;
          flex-flow: column;
          list-style: none;
          counter-reset: step;
          color: var(--green-40);
        }
        .steps > li {
          display: flex;
          align-items: start;
          font-weight: 500;
          font-size: 16px;
          line-height: 40px;
        }
        .steps > li::before {
          content: counter(step) ".";
          counter-increment: step;
          padding-right: 4px;
        }
        .list_wrap {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        img {
          width: 16px;
        }
        .fox {
          font-size: 12px;
        }
        .item {
          font-weight: 500;
          line-height: 24px;
          font-size: 16px;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .item:after {
          content: "/";
          color: var(--green-60);
        }
        .item:last-child:after {
          display: none;
        }
      `}</style>
    </>
  )
}

export default function TopMenuConnectedDAppInfo(props: {
  title: string
  url: string
  faviconUrl: string
  isConnected: boolean
  close: () => void
  disconnect: () => void
}): ReactElement {
  const { t } = useTranslation("translation", {
    keyPrefix: "topMenu.connectedDappInfo",
  })
  const { t: tShared } = useTranslation("translation", { keyPrefix: "shared" })
  const { title, url, close, faviconUrl, disconnect, isConnected } = props
  return (
    <div className="bg">
      <div className="window">
        <button
          type="button"
          className="icon_close"
          aria-label={tShared("close")}
          onClick={close}
        />
        <div className="content">
          <h1>{t(`${isConnected ? "dAppTitle" : "dappConnections"}`)}</h1>
          {isConnected && (
            <>
              <div className="favicon" />
              <div className="title text ellipsis" title={title}>
                {title}
              </div>
              <div className="url text ellipsis" title={url}>
                {url}
              </div>
              <button
                aria-label="disconnect"
                type="button"
                className="disconnect_icon"
                onClick={disconnect}
              />
            </>
          )}
        </div>
        <ConnectionDAppGuideline isConnected={isConnected} />
      </div>
      <button
        aria-label={t("modalClose")}
        type="button"
        className="void_space"
        onClick={close}
      />
      <style jsx>{`
        .bg {
          width: 100%;
          height: 100%;
          border-radius: 16px;
          background-color: rgba(0, 37, 34, 0.71);
          position: fixed;
          z-index: 99999;
          top: 55px;
          left: 0px;
        }
        .window {
          width: 352px;
          max-height: 433px;
          box-shadow: 0 10px 12px rgba(0, 20, 19, 0.34),
            0 14px 16px rgba(0, 20, 19, 0.24), 0 24px 24px rgba(0, 20, 19, 0.14);
          border-radius: 8px;
          background-color: var(--green-95);
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 0 auto;
          justify-content: space-between;
          padding-bottom: 16px;
        }
        .content {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .icon_close {
          mask-image: url("./images/close.svg");
          mask-size: cover;
          width: 12px;
          height: 12px;
          position: absolute;
          right: 33px;
          background-color: var(--green-20);
          z-index: 1;
          margin-top: 17px;
        }
        .void_space {
          height: 100%;
          width: 100%;
          position: fixed;
          top: 0;
          left: 0;
          z-index: -1;
        }
        h1 {
          color: var(--${isConnected ? "success" : "green-20"});
          font-size: 16px;
          font-weight: 400;
          line-height: 24px;
          text-align: center;
        }
        .favicon {
          background: url("${faviconUrl === ""
            ? "./images/dapp_favicon_default@2x.png"
            : faviconUrl}");
          background-size: cover;
          width: 48px;
          height: 48px;
          border-radius: 12px;
          margin-top: 5px;
          flex-shrink: 0;
        }
        .title {
          color: #fff;
          font-weight: 500;
          margin-top: 10px;
        }
        .url {
          color: var(--green-40);
          margin-top: 5px;
        }
        .text {
          font-size: 16px;
          width: calc(100% - 16px);
          padding: 0 8px;
          text-align: center;
        }
        .disconnect_icon {
          background: url("./images/disconnect@2x.png");
          background-size: cover;
          width: 16px;
          height: 18px;
          margin: 16px 0 32px;
        }
      `}</style>
    </div>
  )
}
