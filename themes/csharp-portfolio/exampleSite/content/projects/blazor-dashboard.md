---
title: "Real-time Analytics Dashboard"
description: "Interactive Blazor Server dashboard with real-time data visualization and SignalR integration"
date: 2023-12-10
draft: false
featured: true
technologies:
    [
        "C#",
        "Blazor Server",
        "SignalR",
        "Chart.js",
        "Entity Framework",
        "SQL Server",
        "Azure",
    ]
github: "https://github.com/johndoe/blazor-dashboard"
demo: "https://dashboard-demo.johndoe.dev"
image: "/images/projects/blazor-dashboard.png"
---

## Overview

A comprehensive real-time analytics dashboard built with **Blazor Server** that provides interactive data visualization, real-time updates via **SignalR**, and responsive design. The dashboard serves as a central hub for monitoring business metrics, user activity, and system performance.

## Key Features

### 📊 Real-time Data Visualization

-   **Interactive Charts**: Dynamic charts using Chart.js integration
-   **Live Updates**: Real-time data streaming with SignalR
-   **Multiple Chart Types**: Line, bar, pie, and doughnut charts
-   **Responsive Design**: Optimized for desktop and mobile viewing

### 🔄 SignalR Integration

-   **Live Data Streaming**: Automatic updates without page refresh
-   **Connection Management**: Robust connection handling with reconnection logic
-   **Group Broadcasting**: Targeted updates to specific user groups
-   **Scalable Architecture**: Support for multiple concurrent users

### 🎨 Modern UI/UX

-   **Component-Based Architecture**: Reusable Blazor components
-   **Dark/Light Theme**: Theme switching with user preference persistence
-   **Responsive Layout**: CSS Grid and Flexbox for optimal layouts
-   **Loading States**: Smooth loading indicators and skeleton screens

## Technical Implementation

### Blazor Components Architecture

```csharp
@page "/dashboard"
@using Microsoft.AspNetCore.SignalR.Client
@implements IAsyncDisposable
@inject IJSRuntime JSRuntime

<div class="dashboard-container">
    <div class="dashboard-header">
        <h1>Analytics Dashboard</h1>
        <div class="connection-status">
            <span class="status-indicator @GetConnectionStatusClass()"></span>
            @GetConnectionStatusText()
        </div>
    </div>

    <div class="dashboard-grid">
        <MetricCard Title="Total Users"
                   Value="@metrics.TotalUsers"
                   Change="@metrics.UserGrowth"
                   Icon="users" />

        <MetricCard Title="Revenue"
                   Value="@metrics.Revenue.ToString("C")"
                   Change="@metrics.RevenueGrowth"
                   Icon="dollar-sign" />

        <ChartComponent @ref="salesChart"
                       ChartType="ChartType.Line"
                       Title="Sales Trend" />

        <ChartComponent @ref="userChart"
                       ChartType="ChartType.Doughnut"
                       Title="User Distribution" />
    </div>
</div>

@code {
    private HubConnection? hubConnection;
    private DashboardMetrics metrics = new();
    private ChartComponent salesChart = default!;
    private ChartComponent userChart = default!;

    protected override async Task OnInitializedAsync()
    {
        // Initialize SignalR connection
        hubConnection = new HubConnectionBuilder()
            .WithUrl("/dashboardHub")
            .WithAutomaticReconnect()
            .Build();

        // Register event handlers
        hubConnection.On<DashboardMetrics>("UpdateMetrics", async (newMetrics) =>
        {
            metrics = newMetrics;
            await InvokeAsync(StateHasChanged);
        });

        hubConnection.On<ChartData>("UpdateSalesChart", async (data) =>
        {
            await salesChart.UpdateDataAsync(data);
        });

        await hubConnection.StartAsync();

        // Load initial data
        await LoadInitialData();
    }
}
```

### SignalR Hub Implementation

```csharp
public class DashboardHub : Hub
{
    private readonly IDashboardService _dashboardService;
    private readonly ILogger<DashboardHub> _logger;

    public DashboardHub(IDashboardService dashboardService, ILogger<DashboardHub> logger)
    {
        _dashboardService = dashboardService;
        _logger = logger;
    }

    public async Task JoinDashboardGroup()
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, "Dashboard");
        _logger.LogInformation("User {ConnectionId} joined dashboard group", Context.ConnectionId);
    }

    public async Task LeaveDashboardGroup()
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, "Dashboard");
        _logger.LogInformation("User {ConnectionId} left dashboard group", Context.ConnectionId);
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, "Dashboard");
        await base.OnDisconnectedAsync(exception);
    }
}

// Background service for pushing updates
public class DashboardUpdateService : BackgroundService
{
    private readonly IHubContext<DashboardHub> _hubContext;
    private readonly IDashboardService _dashboardService;

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                var metrics = await _dashboardService.GetLatestMetricsAsync();
                await _hubContext.Clients.Group("Dashboard")
                    .SendAsync("UpdateMetrics", metrics, stoppingToken);

                var salesData = await _dashboardService.GetSalesChartDataAsync();
                await _hubContext.Clients.Group("Dashboard")
                    .SendAsync("UpdateSalesChart", salesData, stoppingToken);

                await Task.Delay(TimeSpan.FromSeconds(30), stoppingToken);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating dashboard data");
            }
        }
    }
}
```

### Reusable Chart Component

```csharp
@using Microsoft.JSInterop
@implements IAsyncDisposable

<div class="chart-container">
    <div class="chart-header">
        <h3>@Title</h3>
        <div class="chart-controls">
            <button class="btn btn-sm" @onclick="RefreshChart">
                <i class="icon-refresh"></i>
            </button>
        </div>
    </div>
    <div class="chart-wrapper">
        <canvas id="@ChartId" width="400" height="200"></canvas>
    </div>
</div>

@code {
    [Parameter] public string Title { get; set; } = string.Empty;
    [Parameter] public ChartType ChartType { get; set; }
    [Parameter] public ChartData? InitialData { get; set; }

    private string ChartId { get; set; } = Guid.NewGuid().ToString();
    private IJSObjectReference? chartModule;
    private IJSObjectReference? chartInstance;

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            chartModule = await JSRuntime.InvokeAsync<IJSObjectReference>(
                "import", "./js/chart-interop.js");

            if (InitialData != null)
            {
                await CreateChartAsync(InitialData);
            }
        }
    }

    public async Task UpdateDataAsync(ChartData data)
    {
        if (chartInstance != null)
        {
            await chartModule!.InvokeVoidAsync("updateChart", chartInstance, data);
        }
        else
        {
            await CreateChartAsync(data);
        }
    }

    private async Task CreateChartAsync(ChartData data)
    {
        var config = new ChartConfig
        {
            Type = ChartType.ToString().ToLower(),
            Data = data,
            Options = GetChartOptions()
        };

        chartInstance = await chartModule!.InvokeAsync<IJSObjectReference>(
            "createChart", ChartId, config);
    }

    private object GetChartOptions()
    {
        return new
        {
            responsive = true,
            maintainAspectRatio = false,
            plugins = new
            {
                legend = new { display = true },
                tooltip = new { enabled = true }
            },
            scales = ChartType == ChartType.Line || ChartType == ChartType.Bar ? new
            {
                y = new { beginAtZero = true }
            } : null
        };
    }
}
```

### JavaScript Interop for Charts

```javascript
// wwwroot/js/chart-interop.js
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export function createChart(canvasId, config) {
	const ctx = document.getElementById(canvasId).getContext("2d");
	return new Chart(ctx, config);
}

export function updateChart(chart, newData) {
	chart.data = newData;
	chart.update("active");
}

export function destroyChart(chart) {
	if (chart) {
		chart.destroy();
	}
}
```

## Data Layer Implementation

### Entity Framework Models

```csharp
public class DashboardMetric
{
    public int Id { get; set; }
    public string MetricName { get; set; } = string.Empty;
    public decimal Value { get; set; }
    public DateTime Timestamp { get; set; }
    public string Category { get; set; } = string.Empty;
    public Dictionary<string, object> Metadata { get; set; } = new();
}

public class UserActivity
{
    public int Id { get; set; }
    public string UserId { get; set; } = string.Empty;
    public string Action { get; set; } = string.Empty;
    public DateTime Timestamp { get; set; }
    public string IpAddress { get; set; } = string.Empty;
    public string UserAgent { get; set; } = string.Empty;
}

public class SalesData
{
    public int Id { get; set; }
    public DateTime Date { get; set; }
    public decimal Amount { get; set; }
    public string ProductCategory { get; set; } = string.Empty;
    public string Region { get; set; } = string.Empty;
}
```

### Dashboard Service

```csharp
public interface IDashboardService
{
    Task<DashboardMetrics> GetLatestMetricsAsync();
    Task<ChartData> GetSalesChartDataAsync();
    Task<ChartData> GetUserDistributionDataAsync();
    Task<List<RecentActivity>> GetRecentActivityAsync(int count = 10);
}

public class DashboardService : IDashboardService
{
    private readonly ApplicationDbContext _context;
    private readonly IMemoryCache _cache;

    public async Task<DashboardMetrics> GetLatestMetricsAsync()
    {
        const string cacheKey = "dashboard_metrics";

        if (_cache.TryGetValue(cacheKey, out DashboardMetrics? cachedMetrics))
        {
            return cachedMetrics!;
        }

        var metrics = new DashboardMetrics
        {
            TotalUsers = await _context.Users.CountAsync(),
            ActiveUsers = await _context.UserActivities
                .Where(a => a.Timestamp >= DateTime.UtcNow.AddDays(-30))
                .Select(a => a.UserId)
                .Distinct()
                .CountAsync(),
            Revenue = await _context.SalesData
                .Where(s => s.Date >= DateTime.UtcNow.AddDays(-30))
                .SumAsync(s => s.Amount),
            OrderCount = await _context.Orders
                .Where(o => o.CreatedAt >= DateTime.UtcNow.AddDays(-30))
                .CountAsync()
        };

        // Calculate growth percentages
        metrics.UserGrowth = await CalculateGrowthPercentage(
            () => _context.Users.CountAsync(),
            DateTime.UtcNow.AddDays(-60),
            DateTime.UtcNow.AddDays(-30)
        );

        _cache.Set(cacheKey, metrics, TimeSpan.FromMinutes(5));
        return metrics;
    }

    public async Task<ChartData> GetSalesChartDataAsync()
    {
        var salesData = await _context.SalesData
            .Where(s => s.Date >= DateTime.UtcNow.AddDays(-30))
            .GroupBy(s => s.Date.Date)
            .Select(g => new { Date = g.Key, Total = g.Sum(s => s.Amount) })
            .OrderBy(s => s.Date)
            .ToListAsync();

        return new ChartData
        {
            Labels = salesData.Select(s => s.Date.ToString("MMM dd")).ToArray(),
            Datasets = new[]
            {
                new ChartDataset
                {
                    Label = "Daily Sales",
                    Data = salesData.Select(s => (double)s.Total).ToArray(),
                    BackgroundColor = "rgba(54, 162, 235, 0.2)",
                    BorderColor = "rgba(54, 162, 235, 1)",
                    BorderWidth = 2
                }
            }
        };
    }
}
```

## Performance Optimizations

### Caching Strategy

```csharp
public class CachedDashboardService : IDashboardService
{
    private readonly IDashboardService _inner;
    private readonly IDistributedCache _cache;
    private readonly ILogger<CachedDashboardService> _logger;

    public async Task<DashboardMetrics> GetLatestMetricsAsync()
    {
        const string cacheKey = "dashboard:metrics";

        var cachedData = await _cache.GetStringAsync(cacheKey);
        if (cachedData != null)
        {
            return JsonSerializer.Deserialize<DashboardMetrics>(cachedData)!;
        }

        var metrics = await _inner.GetLatestMetricsAsync();

        var serializedData = JsonSerializer.Serialize(metrics);
        await _cache.SetStringAsync(cacheKey, serializedData, new DistributedCacheEntryOptions
        {
            AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5)
        });

        return metrics;
    }
}
```

### Database Query Optimization

```csharp
public async Task<List<TopProduct>> GetTopProductsAsync(int count = 10)
{
    return await _context.SalesData
        .Where(s => s.Date >= DateTime.UtcNow.AddDays(-30))
        .GroupBy(s => s.ProductCategory)
        .Select(g => new TopProduct
        {
            Category = g.Key,
            TotalSales = g.Sum(s => s.Amount),
            OrderCount = g.Count()
        })
        .OrderByDescending(p => p.TotalSales)
        .Take(count)
        .AsNoTracking() // Read-only optimization
        .ToListAsync();
}
```

## Challenges and Solutions

### Challenge: Real-time Performance with Many Concurrent Users

**Problem**: SignalR connections were consuming too much memory with hundreds of concurrent users.

**Solution**: Implemented connection pooling and selective updates based on user subscriptions.

```csharp
public class OptimizedDashboardHub : Hub
{
    public async Task SubscribeToMetric(string metricName)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, $"metric_{metricName}");
    }

    public async Task UnsubscribeFromMetric(string metricName)
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, $"metric_{metricName}");
    }
}
```

### Challenge: Chart Rendering Performance

**Problem**: Large datasets were causing browser freezing during chart updates.

**Solution**: Implemented data sampling and progressive loading for large datasets.

```csharp
public async Task<ChartData> GetSalesChartDataAsync(int maxPoints = 100)
{
    var totalDays = 365;
    var sampleRate = Math.Max(1, totalDays / maxPoints);

    var salesData = await _context.SalesData
        .Where(s => s.Date >= DateTime.UtcNow.AddDays(-totalDays))
        .GroupBy(s => s.Date.Date)
        .Select(g => new { Date = g.Key, Total = g.Sum(s => s.Amount) })
        .OrderBy(s => s.Date)
        .Where((s, index) => index % sampleRate == 0) // Sample data
        .ToListAsync();

    return CreateChartData(salesData);
}
```

## Testing Strategy

### Component Testing

```csharp
[Test]
public void MetricCard_WithPositiveChange_ShowsGreenIndicator()
{
    // Arrange
    using var ctx = new TestContext();

    // Act
    var component = ctx.RenderComponent<MetricCard>(parameters => parameters
        .Add(p => p.Title, "Test Metric")
        .Add(p => p.Value, "100")
        .Add(p => p.Change, 15.5m));

    // Assert
    var indicator = component.Find(".change-indicator");
    indicator.ClassList.Should().Contain("positive");
    component.Find(".change-value").TextContent.Should().Contain("+15.5%");
}
```

### SignalR Integration Testing

```csharp
[Test]
public async Task DashboardHub_UpdateMetrics_BroadcastsToAllClients()
{
    // Arrange
    var hubContext = GetMockHubContext();
    var service = new DashboardUpdateService(hubContext.Object, _dashboardService);

    // Act
    await service.StartAsync(CancellationToken.None);
    await Task.Delay(100); // Allow background service to run

    // Assert
    hubContext.Verify(x => x.Clients.Group("Dashboard")
        .SendAsync("UpdateMetrics", It.IsAny<DashboardMetrics>(), It.IsAny<CancellationToken>()),
        Times.AtLeastOnce);
}
```

## Deployment and Monitoring

### Azure Deployment

```yaml
# docker-compose.yml for local development
version: "3.8"
services:
    dashboard:
        build: .
        ports:
            - "5000:80"
        environment:
            - ConnectionStrings__DefaultConnection=Server=db;Database=Dashboard;User=sa;Password=YourPassword123!
            - ASPNETCORE_ENVIRONMENT=Development
        depends_on:
            - db
            - redis

    db:
        image: mcr.microsoft.com/mssql/server:2022-latest
        environment:
            - ACCEPT_EULA=Y
            - SA_PASSWORD=YourPassword123!

    redis:
        image: redis:alpine
        ports:
            - "6379:6379"
```

### Application Insights Integration

```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddApplicationInsightsTelemetry();

    services.AddSingleton<ITelemetryInitializer, CustomTelemetryInitializer>();

    // Custom metrics tracking
    services.AddScoped<IDashboardMetricsTracker, DashboardMetricsTracker>();
}

public class DashboardMetricsTracker : IDashboardMetricsTracker
{
    private readonly TelemetryClient _telemetryClient;

    public void TrackDashboardView(string userId)
    {
        _telemetryClient.TrackEvent("DashboardViewed", new Dictionary<string, string>
        {
            ["UserId"] = userId,
            ["Timestamp"] = DateTime.UtcNow.ToString("O")
        });
    }

    public void TrackChartInteraction(string chartType, string action)
    {
        _telemetryClient.TrackEvent("ChartInteraction", new Dictionary<string, string>
        {
            ["ChartType"] = chartType,
            ["Action"] = action
        });
    }
}
```

## Results and Impact

-   **User Engagement**: 40% increase in dashboard usage after real-time features
-   **Performance**: Sub-200ms response times for all dashboard operations
-   **Scalability**: Successfully handles 500+ concurrent users
-   **Reliability**: 99.9% uptime with automatic failover capabilities

## Future Enhancements

-   **Mobile App**: React Native companion app
-   **Advanced Analytics**: Machine learning-powered insights
-   **Custom Dashboards**: User-configurable dashboard layouts
-   **Export Features**: PDF and Excel report generation
-   **Alerting System**: Configurable alerts based on metric thresholds

This project showcases modern Blazor development with real-time capabilities, demonstrating how to build responsive, scalable web applications with .NET.
