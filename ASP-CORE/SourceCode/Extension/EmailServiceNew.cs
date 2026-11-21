using System.Net;
using System.Net.Mail;

namespace _31241028406_VuVanHoan.Extension;

public class EmailServiceNew
{
    public static async Task<bool> SendMailGoogleSmtp(
        string from,
        string to,
        string subject,
        string body,
        string gmailSend,
        string gmailPassword)
    {
        using var client = new SmtpClient("smtp.gmail.com")
        {
            Port = 587,
            Credentials = new NetworkCredential(gmailSend, gmailPassword),
            EnableSsl = true
        };

        return await SendMail(from, to, subject, body, client);
    }

    public static async Task<bool> SendMail(
        string from,
        string to,
        string subject,
        string body,
        SmtpClient client)
    {
        using var message = new MailMessage(from, to, subject, body)
        {
            BodyEncoding = System.Text.Encoding.UTF8,
            SubjectEncoding = System.Text.Encoding.UTF8,
            IsBodyHtml = true
        };

        message.ReplyToList.Add(new MailAddress(from));
        message.Sender = new MailAddress(from);

        try
        {
            await client.SendMailAsync(message);
            return true;
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return false;
        }
    }
}