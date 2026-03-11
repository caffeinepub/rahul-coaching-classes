import Text "mo:core/Text";
import Int "mo:core/Int";
import Array "mo:core/Array";
import List "mo:core/List";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Initialize the access control state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Type
  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  // User Profile Functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Application Types
  type Material = {
    id : Nat;
    title : Text;
    description : Text;
    classNumber : Nat;
    subject : Text;
    fileUrl : Text;
    fileType : Text;
    uploadDate : Time.Time;
  };

  module Material {
    public func compareByClassNumber(material1 : Material, material2 : Material) : Order.Order {
      Nat.compare(material1.classNumber, material2.classNumber);
    };
  };

  type SamplePaper = {
    id : Nat;
    title : Text;
    classNumber : Nat;
    subject : Text;
    year : Nat;
    fileUrl : Text;
    uploadDate : Time.Time;
  };

  module SamplePaper {
    public func compareByYear(paper1 : SamplePaper, paper2 : SamplePaper) : Order.Order {
      Nat.compare(paper1.year, paper2.year);
    };
  };

  type Announcement = {
    id : Nat;
    title : Text;
    content : Text;
    date : Time.Time;
    isPinned : Bool;
  };

  module Announcement {
    public func compareByDate(announcement1 : Announcement, announcement2 : Announcement) : Order.Order {
      Int.compare(announcement1.date, announcement2.date);
    };
  };

  let materials = Map.empty<Nat, Material>();
  let samplePapers = Map.empty<Nat, SamplePaper>();
  let announcements = Map.empty<Nat, Announcement>();
  var nextId = 1;

  // Study Materials Management (Admin Only)
  public shared ({ caller }) func addMaterial(material : Material) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add materials");
    };
    materials.add(material.id, material);
  };

  public shared ({ caller }) func updateMaterial(id : Nat, material : Material) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update materials");
    };
    if (not materials.containsKey(id)) {
      Runtime.trap("Material with ID " # id.toText() # " does not exist.");
    };
    materials.add(id, material);
  };

  public shared ({ caller }) func deleteMaterial(id : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete materials");
    };
    if (not materials.containsKey(id)) {
      Runtime.trap("Material with ID " # id.toText() # " does not exist.");
    };
    materials.remove(id);
  };

  // Sample Papers Management (Admin Only)
  public shared ({ caller }) func addSamplePaper(paper : SamplePaper) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add sample papers");
    };
    samplePapers.add(paper.id, paper);
  };

  public shared ({ caller }) func updateSamplePaper(id : Nat, paper : SamplePaper) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update sample papers");
    };
    if (not samplePapers.containsKey(id)) {
      Runtime.trap("Sample paper with ID " # id.toText() # " does not exist.");
    };
    samplePapers.add(id, paper);
  };

  public shared ({ caller }) func deleteSamplePaper(id : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete sample papers");
    };
    if (not samplePapers.containsKey(id)) {
      Runtime.trap("Sample paper with ID " # id.toText() # " does not exist.");
    };
    samplePapers.remove(id);
  };

  // Announcements Management (Admin Only)
  public shared ({ caller }) func addAnnouncement(announcement : Announcement) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add announcements");
    };
    announcements.add(announcement.id, announcement);
  };

  public shared ({ caller }) func updateAnnouncement(id : Nat, announcement : Announcement) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update announcements");
    };
    if (not announcements.containsKey(id)) {
      Runtime.trap("Announcement with ID " # id.toText() # " does not exist.");
    };
    announcements.add(id, announcement);
  };

  public shared ({ caller }) func deleteAnnouncement(id : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete announcements");
    };
    if (not announcements.containsKey(id)) {
      Runtime.trap("Announcement with ID " # id.toText() # " does not exist.");
    };
    announcements.remove(id);
  };

  // Query Functions (Anyone can access - including guests)
  public query func getAllMaterials() : async [Material] {
    materials.values().toArray();
  };

  public query func getAllSamplePapers() : async [SamplePaper] {
    samplePapers.values().toArray();
  };

  public query func getAllAnnouncements() : async [Announcement] {
    announcements.values().toArray();
  };

  public query func getMaterialsByClass(classNumber : Nat) : async [Material] {
    let filtered = materials.values().toArray().filter(func(m : Material) : Bool { m.classNumber == classNumber });
    filtered.sort(Material.compareByClassNumber);
  };

  public query func getSamplePapersByYear(year : Nat) : async [SamplePaper] {
    let filtered = samplePapers.values().toArray().filter(func(p : SamplePaper) : Bool { p.year == year });
    filtered.sort(SamplePaper.compareByYear);
  };

  // Stats (Anyone can access)
  public query func getStats() : async {
    totalMaterials : Nat;
    totalPapers : Nat;
    totalAnnouncements : Nat;
  } {
    {
      totalMaterials = materials.size();
      totalPapers = samplePapers.size();
      totalAnnouncements = announcements.size();
    };
  };

  // Helper function for ID generation (no authorization needed)
  public shared func generateId() : async Nat {
    let id = nextId;
    nextId += 1;
    id;
  };
};
