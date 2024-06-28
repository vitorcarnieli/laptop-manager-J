package com.github.vitorcarnieli.laptopmanager.service;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import com.github.vitorcarnieli.laptopmanager.domain.base.BaseEntity;
import com.github.vitorcarnieli.laptopmanager.domain.beneficiary.Beneficiary;
import com.github.vitorcarnieli.laptopmanager.domain.laptop.Laptop;
import com.github.vitorcarnieli.laptopmanager.domain.laptop.LaptopDto;
import com.github.vitorcarnieli.laptopmanager.domain.link.Link;
import com.itextpdf.text.Document;
import com.itextpdf.text.Font;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;

import jakarta.persistence.EntityNotFoundException;

@Service
public class LaptopService extends BaseService<Laptop, LaptopDto> {

    public LaptopService() {
        super(new Laptop());
    }

    public String getBeneficiaryNameByLaptopId(Long id) throws EntityNotFoundException {
        try {
            Laptop laptop = this.findById(id);
            if (laptop == null) {
                throw new EntityNotFoundException("Beneficiary Entity by id: " + id + " not found");
            }
            if (!laptop.isLinked()) {
                throw new RuntimeException("Beneficiary entity by id: " + id + " is not linked");
            }

            return laptop.getCurrentBeneficiary().getName();
        } catch (RuntimeException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException(
                    "An unexpected error occurred while retrieving laptop listed number for Beneficiary with id: " + id,
                    e);
        }
    }

    public List<Link> getAllLinksByLaptopId(Long id) throws Exception {
        try {
            Laptop laptop = this.findById(id);
            if (laptop == null) {
                throw new EntityNotFoundException("Beneficiary Entity by id: " + id + " not found");
            }
            return laptop.getLinks();
        } catch (Exception e) {
            throw e;
        }
    }

    public Object getAvailableLaptops() throws Exception {
        return this.findAll().stream().filter(b -> !b.isLinked()).toList();
    }

    public boolean generateReport() throws Exception {

        List<Laptop> laptops = this.findAll();

        if (laptops.isEmpty()) {
            throw new Exception("Laptops not founded");
        }

        try {
            String path = "/home/info/Projects/laptop-manager-J/src/main/resources/static/reports/";
            String fileName = "report " + new Date().toString();

            Document document = new Document();
            PdfWriter.getInstance(document, new FileOutputStream(path + fileName));

            document.open();
            document.setPageSize(PageSize.A4);

            document.add(createTitle());
            document.add(createTable(laptops));

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

    public Paragraph createTitle() {
        Font fontTitle = new Font(Font.FontFamily.HELVETICA, 18, Font.BOLD);
        Paragraph title = new Paragraph("RELATÓRIO GERAL REFERENTE AOS NOTEBOOKS", fontTitle);
        title.setAlignment(com.itextpdf.text.Element.ALIGN_CENTER);
        title.setSpacingAfter(20f);
        return title;
    }

    public PdfPTable createTable(List<Laptop> laptops) {
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

        laptops.forEach(l -> {
            try {
                table.addCell(
                        new PdfPCell(new Paragraph(l.getSerialNumber(), new Font(Font.FontFamily.HELVETICA, 8))));
                table.addCell(
                        new PdfPCell(new Paragraph(l.getListedNumber(), new Font(Font.FontFamily.HELVETICA, 8))));
                table.addCell(new PdfPCell(
                        new Paragraph(l.isLinked() ? "EM CONTRATO VIGENTE" : "DISPONÍVEL PARA ENTREGA",
                                new Font(Font.FontFamily.HELVETICA, 8))));
                table.addCell(new PdfPCell(l.isLinked()
                        ? new Paragraph(l.getCurrentBeneficiary().getDocument(), new Font(Font.FontFamily.HELVETICA, 8))
                        : new Paragraph(" ")));

            } catch (Exception e) {
                e.printStackTrace();
            }
        });
        return table;
    }

}
