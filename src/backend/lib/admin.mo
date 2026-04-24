import Map "mo:core/Map";

module {
  let ADMIN_USERNAME = "alokpandey12@";
  let ADMIN_PASSWORD = "alokpandey12@";

  // Simple deterministic token from username+timestamp-ish
  func makeToken(username : Text) : Text {
    "tok_" # username # "_uday_admin";
  };

  public func login(username : Text, password : Text) : ?Text {
    if (username == ADMIN_USERNAME and password == ADMIN_PASSWORD) {
      ?makeToken(username);
    } else {
      null;
    };
  };

  public func verifyToken(validTokens : Map.Map<Text, Bool>, token : Text) : Bool {
    switch (validTokens.get(token)) {
      case (?true) true;
      case _ false;
    };
  };

  public func storeToken(validTokens : Map.Map<Text, Bool>, token : Text) {
    validTokens.add(token, true);
  };
};
