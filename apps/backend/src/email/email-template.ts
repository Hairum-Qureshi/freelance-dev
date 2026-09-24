export const EMAIL_TEMPLATE = `<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  border="0"
  style="
    margin: 0;
    padding: 0;
    background-color: #f5f5f5;
    font-family: Arial, Helvetica, sans-serif;
    color: #111111;
  "
>
  <tr>
    <td align="center" style="padding: 40px 16px;">      
      <table
        width="100%"
        cellpadding="0"
        cellspacing="0"
        border="0"
        style="
          max-width: 600px;
          background-color: #ffffff;
          border: 1px solid #111111;
          border-radius: 12px;
          overflow: hidden;
        "
      >
        <tr>
          <td
            style="
              padding: 28px 32px;
              border-bottom: 1px solid #111111;
            "
          >
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td>
                  <span
                    style="
                      font-size: 20px;
                      font-weight: 700;
                      letter-spacing: -0.5px;
                      color: #111111;
                    "
                  >
                    Freelance Dev
                  </span>
                </td>

                <td align="right">
                  <span
                    style="
                      font-size: 12px;
                      color: #666666;
                    "
                  >
                    MESSAGE
                  </span>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding: 36px 32px 32px;">            
            <h1
              style="
                margin: 0 0 10px;
                font-size: 28px;
                line-height: 36px;
                font-weight: 700;
                letter-spacing: -0.7px;
                color: #111111;
              "
            >
              You've received a message
            </h1>

            <p
              style="
                margin: 0 0 28px;
                font-size: 15px;
                line-height: 24px;
                color: #666666;
              "
            >
              Someone reached out to you on Freelance Dev.
            </p>
            <table
              width="100%"
              cellpadding="0"
              cellspacing="0"
              border="0"
              style="
                margin-bottom: 20px;
                border-bottom: 1px solid #e5e5e5;
                padding-bottom: 20px;
              "
            >
              <tr>
                <td width="48" valign="middle">
                  <div
                    style="
                      width: 42px;
                      height: 42px;
                      background-color: #111111;
                      color: #ffffff;
                      border-radius: 50%;
                      text-align: center;
                      line-height: 42px;
                      font-size: 16px;
                      font-weight: 700;
                    "
                  >
                    {{initials}}
                  </div>
                </td>
                <td valign="middle" style="padding-left: 12px;">
                  <div
                    style="
                      font-size: 15px;
                      font-weight: 700;
                      color: #111111;
                      margin-bottom: 3px;
                    "
                  >
                    {{full name}}
                  </div>

                  <div
                    style="
                      font-size: 13px;
                      color: #777777;
                    "
                  >
                    {{ email }}
                  </div>
                </td>
                <td
                  align="right"
                  valign="middle"
                  style="
                    font-size: 12px;
                    color: #888888;
                  "
                >
                  {{ timestamp }}
                </td>
              </tr>
            </table>
            <table
              width="100%"
              cellpadding="0"
              cellspacing="0"
              border="0"
              style="
                margin-bottom: 28px;
                background-color: #f7f7f7;
                border-left: 4px solid #111111;
                border-radius: 4px;
              "
            >
              <tr>
                <td style="padding: 20px 22px;">
                  <p
                    style="
                      margin: 0;
                      font-size: 15px;
                      line-height: 25px;
                      color: #333333;
                    "
                  >
                    {{ message }}
                  </p>
                </td>
              </tr>
            </table>
            <table
              cellpadding="0"
              cellspacing="0"
              border="0"
              style="margin-bottom: 12px;"
            >
              <tr>
                <td
                  align="center"
                  style="
                    background-color: #111111;
                    border-radius: 6px;
                  "
                >
                  <a
                    href="{{ message_url }}"
                    style="
                      display: inline-block;
                      padding: 13px 24px;
                      font-size: 14px;
                      font-weight: 700;
                      color: #ffffff;
                      text-decoration: none;
                      border: 1px solid #111111;
                      border-radius: 6px;
                    "
                  >
                    View Message
                  </a>
                </td>
              </tr>
            </table>
            <p
              style="
                margin: 0;
                font-size: 12px;
                line-height: 20px;
                color: #888888;
              "
            >
              You can reply to this message from your Freelance Dev inbox.
            </p>
          </td>
        </tr>
        <tr>
          <td
            style="
              padding: 22px 32px;
              border-top: 1px solid #e5e5e5;
              background-color: #fafafa;
            "
          >
            <p
              style="
                margin: 0 0 6px;
                font-size: 12px;
                line-height: 18px;
                color: #777777;
              "
            >
              You're receiving this email because someone contacted you
              through Freelance Dev.
            </p>

            <p
              style="
                margin: 0;
                font-size: 12px;
                line-height: 18px;
                color: #999999;
              "
            >
              © ${new Date().getFullYear()} Freelance Dev
            </p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
