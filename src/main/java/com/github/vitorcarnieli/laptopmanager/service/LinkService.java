package com.github.vitorcarnieli.laptopmanager.service;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.swing.text.html.parser.Element;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.vitorcarnieli.laptopmanager.domain.base.BaseEntity;
import com.github.vitorcarnieli.laptopmanager.domain.beneficiary.Beneficiary;
import com.github.vitorcarnieli.laptopmanager.domain.laptop.Laptop;
import com.github.vitorcarnieli.laptopmanager.domain.link.Link;
import com.github.vitorcarnieli.laptopmanager.domain.link.LinkDto;
import com.itextpdf.text.Document;
import com.itextpdf.text.Font;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfDocument;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.text.Element.*;

import jakarta.persistence.EntityNotFoundException;

@Service
public class LinkService extends BaseService<Link, LinkDto> {

    @Autowired
    BeneficiaryService beneficiaryService;

    @Autowired
    LaptopService laptopService;

    public LinkService() {
        super(new Link());
    }

    public List<Link> findAlll() throws Exception {
        return this.findAll();
    }

    public boolean save(LinkDto dto) throws Exception {
        try {
            Laptop laptop = laptopService.findById(dto.getLaptopId());
            Beneficiary beneficiary = beneficiaryService.findById(dto.getBeneficiaryId());
            Calendar calendar = Calendar.getInstance();
            calendar.set(Calendar.YEAR, dto.getYear().intValue());
            Link link = new Link(laptop, beneficiary, calendar.getTime());
            link.setName(laptop.getListedNumber() + " & " + beneficiary.getName());
            return this.save(link);
        } catch (Exception e) {
            System.out.println(e.getLocalizedMessage());
            throw e;
        }

    }

    public String getBeneficiaryNameLaptopListedNumberByLinkId(Long id) {
        try {
            Link link = this.findById(id);
            if (link == null) {
                throw new EntityNotFoundException("Link Entity by id: " + id + " not found");
            }

            String[] name = link.getBeneficiary().getName().split(" ");
            return link.getLaptop()
                    .getListedNumber().replaceAll("^(\\d{2})(\\d{5})$", "$1-$2")
                    + " & " +
                    name[0] + " " + name[name.length - 1].charAt(0) + ".";
        } catch (RuntimeException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException(
                    "An unexpected error occurred while retrieving laptop listed number for Beneficiary with id: " + id,
                    e);
        }
    }

    public List<List<Object>> getAvailablesBeneficiariesLaptops() {
        List<List<Object>> listReturn = new ArrayList<List<Object>>();
        try {
            List<Beneficiary> beneficiaries = this.beneficiaryService.findAll();
            List<Laptop> laptops = this.laptopService.findAll();
            beneficiaries.removeIf(b -> b.isLinked());
            laptops.removeIf(l -> l.isLinked());
            listReturn.add(Arrays.asList(beneficiaries));
            listReturn.add(Arrays.asList(laptops));
            return listReturn;
        } catch (Exception e) {
            throw new RuntimeException("Error in get beneficiaries and laptops availables");
        }
    }

    public boolean finishLinkForId(Long id) throws Exception {
        try {
            Link link = this.findById(id);
            link.finishLink();
            return this.save(link);
        } catch (EntityNotFoundException e) {
            System.out.println("Link by id:" + id + " not founded");
            throw e;
        }
    }

    public boolean generateReport() throws Exception {

        List<Link> links = this.findAll();

        if (links.isEmpty()) {
            throw new Exception("Links not founded");
        }

        try {
            String path = "/home/info/Projects/laptop-manager-J/src/main/resources/static/reports/";
            String fileName = "report " + new Date().toString();

            Document document = new Document();
            PdfWriter.getInstance(document, new FileOutputStream(path + fileName));

            document.open();
            document.setPageSize(PageSize.A4);

            Font fontTitle = new Font(Font.FontFamily.HELVETICA, 18, Font.BOLD);
            Paragraph title = new Paragraph("Relatório Geral", fontTitle);
            title.setAlignment(com.itextpdf.text.Element.ALIGN_CENTER);
            title.setSpacingAfter(20f);

            PdfPTable table = new PdfPTable(4);
            table.setWidthPercentage(100);

            Font fontSubTitleTableProperties = new Font(Font.FontFamily.HELVETICA, 12, Font.BOLD);
            Paragraph sn = new Paragraph("SN", fontSubTitleTableProperties);
            Paragraph tumbed = new Paragraph("Tombamento", fontSubTitleTableProperties);
            Paragraph situation = new Paragraph("Situação", fontSubTitleTableProperties);
            Paragraph beneficiary = new Paragraph("Cpf vinculado", fontSubTitleTableProperties);

            List<Paragraph> fields = Arrays.asList(sn, tumbed, situation, beneficiary);

            fields.forEach(a -> a.setAlignment(com.itextpdf.text.Element.ALIGN_CENTER));
            ;
            fields.forEach(a -> table.addCell(new PdfPCell(a)));

            links.forEach(l -> {
                System.out.println(l.getName());
                try {
                    Paragraph serialNumberParagraph = new Paragraph(
                            laptopService.findById(l.getLaptopId()).getSerialNumber());
                    Paragraph listedNumberParagraph = new Paragraph(
                            laptopService.findById(l.getLaptopId()).getListedNumber());
                    Paragraph situationParagraph = new Paragraph(
                            l.isCurrent() ? "EM CONTRATO VIGENTE" : "DISPONÍVEL PARA ENTREGA",
                            new Font(Font.FontFamily.HELVETICA, 8));
                    Paragraph documentParagraph = l.isCurrent()
                            ? new Paragraph(beneficiaryService.findById(l.getBeneficiaryId()).getDocument())
                            : new Paragraph(" ");

                    table.addCell(
                            new PdfPCell());
                    table.addCell(new PdfPCell());
                    table.addCell(new PdfPCell());

                } catch (Exception e) {
                    e.printStackTrace();
                }
            });
            document.add(title);
            document.add(table);

            SimpleDateFormat formatoData = new SimpleDateFormat("dd/MM/yyyy - EEEE - HH:mm");
            String data = formatoData.format(new Date());
            document.add(new Paragraph("\n\nRelatório gerado no dia " + data));
            document.close();
            return true;
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }

        return true;
    }

}
