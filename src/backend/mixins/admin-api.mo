import Map "mo:core/Map";
import AdminLib "../lib/admin";

mixin (adminTokens : Map.Map<Text, Bool>) {

  public func adminLogin(username : Text, password : Text) : async ?Text {
    switch (AdminLib.login(username, password)) {
      case (?token) {
        AdminLib.storeToken(adminTokens, token);
        ?token;
      };
      case null null;
    };
  };

  public query func verifyAdmin(token : Text) : async Bool {
    AdminLib.verifyToken(adminTokens, token);
  };
};
