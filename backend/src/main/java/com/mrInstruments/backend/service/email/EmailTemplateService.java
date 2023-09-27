package com.mrInstruments.backend.service.email;

import com.mrInstruments.backend.dto.ProductDto;
import com.mrInstruments.backend.dto.ReservationDto;
import com.mrInstruments.backend.dto.UserDto;
import com.mrInstruments.backend.exception.BadRequestException;
import com.mrInstruments.backend.exception.MailSenderException;
import lombok.extern.log4j.Log4j2;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.File;
import java.time.format.DateTimeFormatter;

import static com.mrInstruments.backend.utils.UtilsFileManager.fileTextToString;

@Service
@Log4j2
@EnableAsync
public class EmailTemplateService {

    private final JavaMailSender mailSender;

    public EmailTemplateService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Async
    public void sendEmailFromTemplate(UserDto userDto, ReservationDto reservationDto) throws MessagingException, BadRequestException, MailSenderException {
        MimeMessage message = mailSender.createMimeMessage();

        message.setFrom(new InternetAddress("mrinstrumentscorporation@gmail.com"));
        message.setRecipients(MimeMessage.RecipientType.TO, userDto.getEmail());
        message.setSubject("Confirmación de registro exitoso en MrInstruments");

        String nombreFichero = null;
        String htmlTemplate = null;
        String sourcePath = "";
        String sCarpAct = System.getProperty("user.dir");
        if (sCarpAct.equals("/")){
            sourcePath = "app" + File.separator + "static" + File.separator;
        }else{
            sourcePath = "src" + File.separator + "main" + File.separator + "resources" + File.separator + "static"+ File.separator;
        }
//        File carpeta = new File(sCarpAct);
//        String[] listado = carpeta.list();
//        if (listado == null || listado.length == 0) {
//            System.out.println("No hay elementos dentro de la carpeta actual");
//            return;
//        }
//        else {
//            for (int i=0; i< listado.length; i++) {
//                System.out.println(listado[i]);
//            }
//        }

        // Read the HTML template into a String variable
        if (reservationDto == null){
            nombreFichero = sourcePath + "template.html";
            htmlTemplate = fileTextToString(nombreFichero);
            htmlTemplate = htmlTemplate.replace("${name}", userDto.getNombre());
            htmlTemplate = htmlTemplate.replace("${surname}", userDto.getApellido()+"!");
            htmlTemplate = htmlTemplate.replace("${email_usuario}", userDto.getEmail());
        }else {
            message.setSubject("Confirmación de Reserva");
            nombreFichero = sourcePath + "template2.html";
            htmlTemplate = fileTextToString(nombreFichero);
            htmlTemplate = htmlTemplate.replace("${name}", userDto.getNombre());
            htmlTemplate = htmlTemplate.replace("${surname}", userDto.getApellido());
            htmlTemplate = htmlTemplate.replace("${fechaReserva}", reservationDto.getFechaReserva().format(DateTimeFormatter.ofPattern("d-MM-uuuu HH:mm:ss")));
            for (ProductDto productDto: reservationDto.getProductos()) {
                htmlTemplate = htmlTemplate.replace("<tr><td></td></tr>", "<tr><td>"+productDto.getNombre()+"</td></tr><tr><td></td></tr>");
            }
            htmlTemplate = htmlTemplate.replace("<tr><td></td></tr>", "");
        }

        // Set the email's content to be the HTML template
        message.setContent(htmlTemplate, "text/html; charset=utf-8");
        message.addHeader("Content-Transfer-Encoding", "quoted-printable");
        log.info("Begin sendMail");
        try {
            mailSender.send(message);
            log.info("End sendMail");
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            throw new MailSenderException(e.getMessage());
        }
    }
}