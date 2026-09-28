export const PAY_RATE_EMAIL_TEMPLATE = `<table
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
                    PAYMENT AGREEMENT
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
              Hello {{ name }}, A pay rate has been agreed upon
            </h1>

            <p
              style="
                margin: 0 0 28px;
                font-size: 15px;
                line-height: 24px;
                color: #666666;
              "
            >
              {{ client_name }} has agreed to pay you
              <strong style="color: #111111;">{{ pay_rate }}</strong>
              for this project.
            </p>

            <table
              width="100%"
              cellpadding="0"
              cellspacing="0"
              border="0"
              style="
                margin-bottom: 28px;
                background-color: #f7f7f7;
                border: 1px solid #e5e5e5;
                border-radius: 8px;
              "
            >
              <tr>
                <td align="center" style="padding: 28px 20px;">
                  <p
                    style="
                      margin: 0 0 6px;
                      font-size: 12px;
                      font-weight: 700;
                      letter-spacing: 0.5px;
                      text-transform: uppercase;
                      color: #777777;
                    "
                  >
                    Agreed Pay Rate
                  </p>

                  <p
                    style="
                      margin: 0;
                      font-size: 32px;
                      line-height: 40px;
                      font-weight: 700;
                      color: #111111;
                    "
                  >
                    {{ pay_rate }}
                  </p>
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
                    If you have any questions or believe this agreement is
                    incorrect, please contact the client through your
                    Freelance Dev inbox.
                  </p>
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
              Please use your Freelance Dev inbox for any questions or
              disputes regarding this agreement.
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
              You're receiving this email because a client agreed to a pay
              rate with you through Freelance Dev.
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
