﻿namespace myApp.Helpers
{
    public class UserParams
    {
    private const int MaxPageSize = 50;
    public int PageNumber { get; set; } = 1;
    private int _pageSize = 16;

    public int PageSize
    {
        get => _pageSize;
        set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
    }
      public string CurrentUserName { get; set; }
      public string Gender { get; set; }
      public int minAge { get; set; } = 18;
      public int maxAge { get; set; } = 100;
      public string OrderBy { get; set; }="lastActive";
    }
  

}