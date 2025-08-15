---
title: "DEA.Next"
description: "DEA (Download Email Attachments) is a comprehensive .NET 8.0 application suite designed to automatically download email attachments from Microsoft Exchange."
date: 2022-03-20
draft: false
featured: true
technologies:
    [
        "C#",
        "Graph API",
        "Entity Framework",
        "Postgres SQL Server",
    ]
github: "https://github.com/s4ndm4n82/DEA.Next"
demo: ""
image: ""
---

## Overview

DEA (Download Email Attachments) is a comprehensive .NET 8.0 application suite designed to automatically download email attachments from Microsoft Exchange Online using the Microsoft Graph API and process them through various delivery methods including FTP/SFTP and REST API integration.

## Key Features

- **Microsoft Graph Integration**: Secure OAuth2 authentication with Exchange Online
- **Multi-Protocol File Transfer**: Support for FTP, FTPS, and SFTP
- **REST API Integration**: Automated file and data submission to web services
- **Database Management**: PostgreSQL backend with Entity Framework Core
- **Customer Configuration**: Multi-tenant support with individual client settings
- **Automated Processing**: Queue-based processing with configurable batch sizes
- **Comprehensive Logging**: Structured logging with Serilog
- **PDF Generation**: Built-in PDF creation capabilities
- **Windows Forms UI**: User-friendly interface for configuration management

## Technical Stack

- **.NET 8.0**: Core framework
- **Entity Framework Core 9.0**: ORM with PostgreSQL provider
- **Microsoft Graph SDK**: Exchange Online integration
- **FluentFTP**: FTP/FTPS operations
- **SSH.NET**: SFTP operations
- **RestSharp**: REST API client
- **Serilog**: Structured logging
- **iText**: PDF generation
- **Windows Forms**: Desktop UI

## Architecture Overview

DEA.Next consists of four interconnected projects:

- **DEA** - Core console application for automated email processing
- **DEA.UI** - Windows Forms management interface
- **DEACleaner** - Log file maintenance utility
- **DEAMailer** - Email notification service

## How it Works

### Processing Flow

1. **Initialization**: Application checks internet connectivity and initializes database
2. **Customer Processing**: Iterates through active customer configurations
3. **Email Processing**:
   - Connects to Exchange Online via Microsoft Graph
   - Downloads attachments from specified folders
   - Processes files according to customer settings
4. **File Delivery**:
   - **FTP/SFTP**: Uploads files to remote servers
   - **REST API**: Submits files and metadata to web services
5. **Cleanup**: Moves processed emails and cleans temporary files

### Email Folder Structure

The application processes emails from configurable folder hierarchies:

- Main folder (e.g., "Inbox")
- Subfolder 1 (e.g., "ProcessedEmails")
- Subfolder 2 (e.g., "AttachmentsReady")

### File Processing

- Attachments are downloaded and validated
- PDF generation for text content when required
- Files are batched according to customer settings
- Metadata is extracted and formatted for downstream systems
